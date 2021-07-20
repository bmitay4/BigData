
// chart 1 Speedometer
Highcharts.chart('chart1', {
	chart: {
		        style: {
            fontFamily: 'Helvetica'
        },
		type: 'gauge',
		plotBackgroundColor: null,
		plotBackgroundImage: null,
		plotBorderWidth: 0,
		plotShadow: false
	},
	title: {
		text: '<b>Average Speed</b>'
	},
	pane: {
		startAngle: -150,
		endAngle: 150,
		background: [{
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
				[0, '#FFF'],
				[1, '#333']
				]
			},
			borderWidth: 0,
			outerRadius: '109%'
		}, {
			backgroundColor: {
				linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
				stops: [
				[0, '#333'],
				[1, '#FFF']
				]
			},
			borderWidth: 1,
			outerRadius: '107%'
		}, {
		}, {
			backgroundColor: '#DDD',
			borderWidth: 0,
			outerRadius: '105%',
			innerRadius: '103%'
		}]
	},
	yAxis: {
		min: 0,
		max: 140,

		minorTickInterval: 'auto',
		minorTickWidth: 1,
		minorTickLength: 10,
		minorTickPosition: 'inside',
		minorTickColor: '#666',

		tickPixelInterval: 30,
		tickWidth: 2,
		tickPosition: 'inside',
		tickLength: 10,
		tickColor: '#666',
		labels: {
			step: 2,
			rotation: 'auto'
		},
		title: {
			text: 'km/h'
		},
		plotBands: [{
			from: 0,
			to: 55,
			color: '#DF5353'
		}, {
			from: 55,
			to: 85,
			color: '#DDDF0D'
		}, {
			from: 85,
			to: 140,
			color: '#55BF3B'
		}]
	},
	    credits: {
        enabled: false
    },
	series: [{
		name: 'Speed',
		data: [95],
		tooltip: {
			valueSuffix: ' km/h'
		}
	}]
},
function (chart) {
	chart.setSize(200, 225, doAnimation = true);
	if (!chart.renderer.forExport) {
		setInterval(function () {
			var point = chart.series[0].points[0],
			newVal,
			inc = Math.round((Math.random() - 0.5) * 50);

			newVal = point.y + inc;
			if (newVal < 0 || newVal > 135) {
				newVal = point.y - inc;
			}

			point.update(newVal);

		}, 5000);
	}
});