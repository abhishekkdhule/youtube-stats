
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Revenue from './Revenue';
import Audience from './Audience';
import Reach from './Reach';


const durationObj = {
	pastFiveDays: {
		from: '2021-02-10',
		to: '2021-02-15'
	},
	pastSevenDays: {
		from: '2021-02-01',
		to: '2021-02-07'
	},
	pastThirtyDays: {
		from: '2021-01-01',
		to: '2021-01-31'
	}
}


function App() {

	const [selectedDuration, setSelectedDuration] = useState('pastThirtyDays')
	const [loading, setLoading] = useState(false)
	const [statsData, setStatsData] = useState(null)

	useEffect(() => {
		setLoading(true)
		fetch(`https://qorner-mock-server.herokuapp.com/stats?startDate=${durationObj[selectedDuration]['from']}&endDate=${durationObj[selectedDuration]['to']}`)
			.then(response => response.json())
			.then(data => {
				setStatsData(data)
				setLoading(false)
			})
			.catch(e => {
				setLoading(false)
				alert("Internal Server Error")
			})
	}, [selectedDuration])


	return (
		<>
			{
				statsData &&
				<>
					<div className="text-center mt-3 text-dark">
						<h1>{statsData.metadata.channelName}</h1>
						<p className="m-1 fs-11">{statsData.metadata.subscribersCount} subscribers </p>
						<p className="fs-11">{statsData.metadata.videoCount} videos</p>
					</div>
				</>
			}
			<div className="container mb-5">
				<div className="row mt-5 justify-content-between">
					<div className="col-5 p-4">
						<h5>Summary</h5>
						<p className="fs-11 light-text">{durationObj[selectedDuration]['from']} - {durationObj[selectedDuration]['to']}</p>
					</div>
					<div className="col-5 text-end p-4">
						<select className="custom-select" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
							<option value="pastThirtyDays">Last 30 days</option>
							<option value="pastSevenDays">Last 7 days</option>
							<option value="pastFiveDays">Last 5 days</option>
						</select>
					</div>
				</div>
				{
					statsData && statsData.hasOwnProperty('error') ?
						<div className="container p-5 text-center">
							<h4>Some Error Occured</h4>
							<p>Try again later</p>
						</div>
						:
						statsData &&

						<>
							<div className="row p-4 m-2 text-center custom-rounded shadow">
								<div className="col-4">
									<p className="light-text fs-11 m-1">Subscribers</p>
									<h5>{statsData.summary.subscribers}M</h5>
								</div>
								<div className="col-4">
									<p className="light-text fs-11 m-1">Views</p>
									<h5>{statsData.summary.views}K</h5>
								</div>
								<div className="col-4">
									<p className="light-text fs-11 m-1">Revenue</p>
									<h5>{statsData.summary.revenue}<small>lac</small></h5>
								</div>
							</div>

							<div className="row justify-content-center">
								<div className="col-md-6 p-4">
									<Revenue durationObj={durationObj} selectedDuration={selectedDuration} revenueDetails={statsData.revenueDetails} loading={loading} />
								</div>
								<div className="col-md-6 p-4">
									<Reach durationObj={durationObj} selectedDuration={selectedDuration} reachAndEngagementDetails={statsData.reachAndEngagementDetails} loading={loading} />
								</div>
								<div className="col-md-6 p-4">
									<Audience durationObj={durationObj} selectedDuration={selectedDuration} audienceDetails={statsData.audienceDetails} loading={loading} />
								</div>
							</div>
						</>
				}
			</div>
		</>
	);
}

export default App;
