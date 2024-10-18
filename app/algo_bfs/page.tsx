import { Block, CodeBlock, parseRoot, parseProps} from "codehike/blocks"
import { z } from "zod"
import { Pre, RawCode, highlight } from "codehike/code"
import {
  Selection,
  Selectable,
  SelectionProvider,
} from "codehike/utils/selection"
import Content from "./content.md"
import Link from "next/link"
import { tokenTransitions } from "../components/annotations/token-transitions"
import { tooltip } from "../components/annotations/tooltip"

const Schema = Block.extend({
  intro: Block,
  steps: z.array(Block.extend({ code: CodeBlock })),
  outro: Block,
  tooltips: z.array(Block).optional(),
  //code: CodeBlock,
})

export default function Page() {
  const { intro, steps, outro, tooltips = [] } = parseRoot(Content, Schema)
  return (
    <main>
      <Link href="/">Back</Link>
      <h1 className="mt-8">{intro.title}</h1>
      {intro.children}
      <SelectionProvider className="flex gap-4" style={{ height: '2000px' }}>
        <div className="flex-1 mt-32 mb-[90vh] ml-2 prose prose-invert">
          {steps.map((step, i) => (
            <Selectable
              key={i}
              index={i}
              selectOn={["click", "scroll"]}
              className="border-l-4 border-zinc-700 data-[selected=true]:border-blue-400 px-5 py-2 mb-24 rounded bg-zinc-900"
            >
              <h2 className="mt-4 text-xl">{step.title}</h2>
              <div>{step.children}</div>
            </Selectable>
          ))}
        </div>
        <div className="w-[40vw] max-w-xl bg-zinc-900" style={{ height: '2000px' }}>
          <div className="top-4 sticky overflow-auto">
            <Selection
              from={steps.map((step) => (
                <Code codeblock={step.code} tooltips={tooltips} />
              ))}
            />
          </div>
        </div>
      </SelectionProvider>
      <h2>{outro.title}</h2>
      {outro.children}
      
    </main>
  )
}

async function Code({ codeblock, tooltips }: { codeblock: RawCode, tooltips: any }) {
  //console.log(codeblock)
  const highlighted = await highlight(codeblock, "github-dark")
  console.log(highlighted)
  //console.log(highlighted)
  /*
  highlighted.annotations = highlighted.annotations.map((a) => {
    //console.log(a)
    const tooltip = tooltips.find((t) => {
      //console.log(t)
      t.title === a.query})
    
    if (!tooltip) return a
    return {
      ...a,
      data: { ...a.data, children: tooltip.children },

    }
  })*/

  return (
    <Pre
      code={highlighted}
      handlers={[tokenTransitions, tooltip]}
      className="min-h-[40rem] bg-transparent"
      style={{fontSize: "25px"}}
    />
  )
}


const Schema2 = Block.extend({
  code: CodeBlock,
  tooltips: z.array(Block).optional(),
})

async function CodeWithTooltips(props: unknown) {
  const { code, tooltips = [] } = parseProps(props, Schema2)
  console.log(code, tooltip)
  const highlighted = await highlight(code, "light-plus")

  highlighted.annotations = highlighted.annotations.map((a) => {
    const tooltip = tooltips.find((t) => t.title === a.query)
    if (!tooltip) return a
    return {
      ...a,
      data: { ...a.data, children: tooltip.children },

    }
  })
  return <Pre code={highlighted} handlers={[tooltip]} />
}
