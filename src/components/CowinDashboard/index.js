import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

const loaderS = {
  load: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class CowinDashboard extends Component {
  state = {last7days: [], byGender: [], byAge: [], loadStatus: loaderS.load}

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({loadStatus: loaderS.load})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl, {method: 'GET'})
    if (response.ok) {
      const data = await response.json()
      const vacByD = data.last_7_days_vaccination.map(each => ({
        vaccineDate: each.vaccine_date,
        dose1: each.dose_1,
        dose2: each.dose_2,
      }))

      const vacByA = data.vaccination_by_age
      const vacByG = data.vaccination_by_gender

      this.setState({
        last7days: vacByD,
        byAge: vacByA,
        byGender: vacByG,
        loadStatus: loaderS.success,
      })
    } else {
      this.setState({loadStatus: loaderS.fail})
    }
  }

  renderHeader = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
        alt="website logo"
      />
      <p>Co-Win</p>
      <h1>Cowin Vaccination in India</h1>
    </div>
  )

  renderLoad = () => (
    <>
      {this.renderHeader()}
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    </>
  )

  renderFail = () => (
    <div>
      {this.renderHeader()}
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccess = () => {
    const {last7days, byAge, byGender} = this.state

    return (
      <div>
        {this.renderHeader()}
        <VaccinationCoverage list={last7days} />
        <VaccinationByAge list={byAge} />
        <VaccinationByGender list={byGender} />
      </div>
    )
  }

  renderFinal = () => {
    const {loadStatus} = this.state

    switch (loadStatus) {
      case loaderS.load:
        return this.renderLoad()
      case loaderS.success:
        return this.renderSuccess()
      case loaderS.fail:
        return this.renderFail()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderFinal()}</div>
  }
}

export default CowinDashboard
