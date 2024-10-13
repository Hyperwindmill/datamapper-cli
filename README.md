datamapper-cli
=================

Map data in different formats
=================

Run a new mapping operation:
```
USAGE
  $ dmap map -q <value> [-s <value>] [-t <value>]

FLAGS
  -q, --query=<value>   (required) DMAP Query to use for mapping
  -s, --source=<value>  Inline source to be used by the query
  -t, --type=<value>    Inline source type to be used by the query

DESCRIPTION
  run a new mapping operation

EXAMPLES
  $ dmap map -t xml -s "<test>XXX</test>" -q "from static to target.json"
  $ dmap map -t xml -s "<test>XXX</test>" -q "from static to target.jsonb as json"
  $ dmap map -q "from ./test.xml to target.json"
  $ dmap map -q "from ./test.xmltt as xml to target as json"
```