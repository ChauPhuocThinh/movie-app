import * as React from 'react';
import Paper from '@mui/material/Paper';
import {Chart, BarSeries, Title, ArgumentAxis, ValueAxis} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
export default class Home extends React.PureComponent {
  render() {
    const chartData = this.props.data

    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries
            valueField="views"
            argumentField="day"
          />
          <Title text="Lượt xem trong tuần" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
