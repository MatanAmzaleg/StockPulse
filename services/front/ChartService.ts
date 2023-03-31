import {
    CandlestickData,
    createChart,
    CrosshairMode,
} from 'lightweight-charts';

const candleStickOption = {
    ascendingColor: '#7326d2',
    descendingColor: '#c9c4d1',
};

export function createCandleStickChart(
    el: HTMLElement,
    data: CandlestickData[]
) {
    if (el.children) return;

    const { ascendingColor, descendingColor } = candleStickOption;

    const chart = createChart(el, {
        crosshair: {
            mode: CrosshairMode.Normal,
        },
        width: el.offsetWidth - 72,
        height: el.offsetHeight - 28,
    });

    const lineSeries = chart.addCandlestickSeries({
        upColor: ascendingColor,
        borderUpColor: ascendingColor,
        wickUpColor: ascendingColor,
        downColor: descendingColor,
        borderDownColor: descendingColor,
        wickDownColor: descendingColor,
    });

    lineSeries.setData(data);
    chart.timeScale().fitContent();
}
