# Tomatoes chart

## Data

Random generate some ticks and update it every 10 seconds.
Segment size can be under 0 because random for ticks call.

## Real-time

Simulate API fetch every 3 seconds.

For best user experiencecd, added StatusView component, which renders data about current selection size and last updated calls. 

Also added `Last hour` mode, when data updates more visually.

## Chart

Used http://recharts.org/.

For  `Last hour` mode, ticks grouped by 5 minutes.
Every 5 minutes, the chart just redraw. (it's ok for our case)

But for real-time updating data better use some chart like https://www.highcharts.com/stock/demo/dynamic-update

## State

Used redux and ducks pattern.

## Tests

Add a few tests for utilities. Only positive cases now.


## Types

Used flow. Not each web application should use tools for types. But here we have some not simple functions with merge and transform ticks. Can help.

## Styles 

Just added all styles to App.css. Not ok for real app, but for this project it's ok.

