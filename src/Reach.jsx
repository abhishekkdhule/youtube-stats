import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Reach({ durationObj, selectedDuration, reachAndEngagementDetails, loading }) {
    const reachData = reachAndEngagementDetails.viewsTrend.data
    let totalViews = 0
    for (let i = 0; i < reachData.length; i++) {
        totalViews += reachData[i].value1
    }

    return (
        <>
            <h5>Reach & Engagement</h5>
            <p className="light-text fs-12">{durationObj[selectedDuration]['from']} to {durationObj[selectedDuration]['to']}</p>
            <div className="p-4 graph-container shadow custom-rounded">
                {
                    loading ? <div className="d-flex justify-content-center align-items-center h-100"><Spinner animation="border" variant="primary" /></div> :
                        <>
                            <p className="light-text fs-12">Views</p>
                            <h4>{totalViews}</h4>
                            {
                                reachAndEngagementDetails.viewsTrend.change.percentage > 0 ?
                                    <p className="fs-10 text-success">+{reachAndEngagementDetails.viewsTrend.change.percentage}%</p>
                                    :
                                    <p className="fs-10 text-danger">{reachAndEngagementDetails.viewsTrend.change.percentage}%</p>

                            }
                            <hr />
                            <ResponsiveContainer width="100%" height="70%">
                                <LineChart
                                    data={reachAndEngagementDetails.viewsTrend.data}
                                    margin={{
                                        left: -12
                                    }}
                                >

                                    <XAxis hide={true} dataKey="date" />
                                    <YAxis  axisLine={false} dataKey="value1" />
                                    <Tooltip />
                                    <Legend />
                                    <Line name="Views"  dot={false} legendType="none" type="monotone" dataKey="value1" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                }
            </div>
        </>
    )
}

export default Reach