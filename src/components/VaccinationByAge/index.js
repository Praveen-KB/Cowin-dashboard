import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const VaccinationByAge = props => {
  const {list} = props
  return (
    <>
      <h1>Vaccination by Age</h1>

      <PieChart width="100%" height={300} verticalAlign="middle" align="center">
        <Pie
          cx="50%"
          cy="50%"
          data={list}
          startAngle={0}
          endAngle={360}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#fecba6" />
          <Cell name="45-60" fill="#b3d23f" />
          <Cell name="Above 60" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </>
  )
}

export default VaccinationByAge
