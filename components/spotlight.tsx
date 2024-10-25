import { z } from "zod"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import { Block, CodeBlock, parseProps } from "codehike/blocks"
import { AnnotationHandler, Pre, RawCode, highlight } from "codehike/code"
// import Content from "./content.md"
// From token-transitions example
import { tokenTransitions } from "./annotations/token-transitions"
import { tooltipHandler } from "./annotations/tooltips"

import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
  } from "@/components/ui/tooltip"
// import { SmoothPre } from "./annotations/token-transitions.client"

const Schema = Block.extend({
  steps: z.array(Block.extend({ 
    code: CodeBlock
  })), 
  tooltips: z.array(Block).optional()
})

export function SpotlightPage(props: unknown) {
  const { steps, tooltips} = parseProps(props, Schema)
  // console.log(steps, tooltips, typeof(tooltips))
  return (
    <SelectionProvider className="flex ">
      <div className="flex-1 mt-4 ml-2 prose prose-invert prose-h2:mt-4">
        {steps.map((step, i) => (
          <Selectable
            key={i}
            index={i}
            selectOn={["click"]}
            className="border border-zinc-700 data-[selected=true]:border-blue-400 px-5 py-2 mb-4 rounded bg-zinc-900 cursor-pointer hover:bg-zinc-800 transition-colors duration-200 ease-in-out"
          >
            <h2 className="text-xl">{step.title}</h2>
            <div>{step.children}</div>
          </Selectable>
        ))}
      </div>
      <div className="w-[40vw] max-w-xl ">
        <div className="top-16 sticky overflow-auto h-full p-4">
          <Selection
            from={steps.map((step) => (
              <Code codeblock={step.code} tooltips={tooltips} />
            ))}
          />
        </div>
      </div>
    </SelectionProvider>
  )
}

async function Code({ codeblock, tooltips }: { codeblock: RawCode, tooltips: unknown}) {
  const highlighted = await highlight(codeblock, "github-dark")
  highlighted.annotations = highlighted.annotations.map((a) => {
    const tooltip = tooltips.find((t) => t.title === a.query)
    if (!tooltip) return a
    return {
      ...a,
      data: { ...a.data, children: tooltip.children },

    }
  })
  //console.log(highlighted.annotations)
  return (
    <Pre
      code={highlighted}
      handlers={[tokenTransitions, tooltipHandler]}
      className="max-h-[90vh] min-h-[38rem] bg-zinc-900 h-full m-0 border border-zinc-700 "
    />
  )
}

/*
function RenderContextBody({ text, tooltips }) {
    //const highlighted = highlight(text, "github-dark")
    const parts = text.props.children.split(' ');
    console.log(tooltips)
    //const { query, data } = tooltips
    // console.log(annotations)
    //return <div>{text}</div>
    return (<div>
        {parts.map((part, i) => {
            let found = tooltips.find((t) => t.title === part)
            console.log(found)

            return <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="underline decoration-dashed">
                {text}
              </TooltipTrigger>
              <TooltipContent align="start">
                {text?.children || query}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={i} style={{ color: "red" }}>{part}</span>
          ) : (
            part
          )
        )}</div>)
} */