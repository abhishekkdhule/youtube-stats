import React from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Revenue({ durationObj, selectedDuration, revenueDetails, loading }) {
    let revenueData = revenueDetails.estimatedRevenueTrend.data
    let totalRevenueOfSelectedDuration = 0
    for (let i = 0; i < revenueData.length; i++) {
        totalRevenueOfSelectedDuration += revenueData[i].value1
    }
    let estimatedRevenue = (totalRevenueOfSelectedDuration / revenueData.length).toFixed(2)

    return (
        <>
            <h5>Revenue</h5>
            <p className="light-text">{durationObj[selectedDuration]['from']} to {durationObj[selectedDuration]['to']}</p>
            <div className="p-4 graph-container shadow custom-rounded">
                {
                    loading ? <div className="d-flex justify-content-center align-items-center h-100"><Spinner animation="border" variant="primary" /></div> : <>

                        <p className="light-text fs-12">Estimated Revenue</p>
                        <h4>Rs. {estimatedRevenue}</h4>
                        {
                            revenueDetails.estimatedRevenueTrend.change.percentage < 0 ?

                                <p className="fs-10 text-danger">{revenueDetails.estimatedRevenueTrend.change.percentage}% <i className="fa-solid fa-circle-info"></i></p>
                                :
                                <p className="fs-10 text-success">+{revenueDetails.estimatedRevenueTrend.change.percentage}% <i className="fa-solid fa-circle-info"></i></p>
                        }
                        <hr />
                        <ResponsiveContainer width="100%" height="70%">
                            <LineChart
                                data={revenueDetails.estimatedRevenueTrend.data}
                                margin={{
                                    left: -20
                                }}
                            >

                                <XAxis hide={true} dataKey="date" />
                                <YAxis unit="Rs" axisLine={false} dataKey="value1" />
                                <Tooltip />
                                <Legend />
                                <Line name="Revenue" unit="Rs." type="linear" legendType="none" dot={false} dataKey="value1" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </>

                }
            </div>
        </>
    )
}

export default Revenue