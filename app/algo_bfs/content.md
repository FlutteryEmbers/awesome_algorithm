
## !intro Breath First Search (BFS)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus elit, tincidunt consectetur auctor ac, dignissim eget dolor. Integer magna ante, dictum ut posuere sed, faucibus quis risus.

Phasellus id dolor lacinia, commodo nisl non, condimentum ante. Nam diam augue, tempor quis condimentum eget, luctus vitae felis. Aenean maximus ultrices massa ac viverra. Nullam tellus enim, tincidunt ac ligula eu, placerat vulputate justo. Vivamus non dui malesuada, mattis dolor vitae, aliquam ipsum. Sed dapibus nibh nisi, sit amet consectetur sapien scelerisque at.


## !!steps BFS on Tree

Tree is a special type of graph, where it contains no cycle...

```python ! bfs.py

queue = deque([root])
# !tooltip[/while/] description_while
while queue:
  node = queue.popleft()
  for child in node.children:
    queue.append(child)
```


## !!tooltips description_while

while is bla bla bla....


## !!steps BFS on General Graph

Need to handle cycle

```python ! bfs.py
queue = deque([root])
visit = set()
while queue:
  node = queue.popleft()
  if node in visit:
    continue
  visit.add(node)
  for child in node.children:
    if child not in visit:
      queue.append(child)
```

## !!steps Shortest Path Problem

The third book, A Storm of Swords, is known for its intense and shocking developments. Battles rage on, alliances shift, and characters face unexpected challenges and betrayals, making it one of the most thrilling books in the series.

```python ! bfs.py
queue = deque([(root, 0)])
visit = set()
while queue:
  node, dist = queue.popleft()
  if node in visit:
    continue
  visit.add(node)
  for child in node.children:
    if child not in visit:
      queue.append((child, dist + 1))
```

## !!steps Shortest Path Problem with Weights: Dijstrak's Algorithm

The third book, A Storm of Swords, is known for its intense and shocking developments. Battles rage on, alliances shift, and characters face unexpected challenges and betrayals, making it one of the most thrilling books in the series.

```python ! bfs.py
heap = [(root, 0)]
visit = set()
while heap:
  node, dist = heapq.heappop(heap)
  if node in visit:
    continue
  visit.add(node)
  for child, w in neighbor[node]:
    if child not in visit:
      queue.append((child, dist + w))
```

## !outro

Quisque id pretium neque. Vestibulum metus orci, pretium nec varius convallis, viverra quis urna. Praesent luctus, purus nec tempus placerat, justo lorem auctor ligula, ut condimentum tellus velit ac erat. Fusce ut dictum libero. Vestibulum ipsum mauris, cursus sed tortor at, rhoncus viverra ipsum. Donec odio dolor, varius quis congue posuere, tempor et justo. Praesent at scelerisque metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed malesuada leo vitae mauris eleifend condimentum. Proin auctor, ex ac aliquam gravida, felis felis lacinia libero, efficitur aliquet nulla neque sed elit. Vestibulum congue aliquam risus, sit amet rutrum magna euismod ac. Integer posuere neque nec ex sollicitudin rhoncus.


