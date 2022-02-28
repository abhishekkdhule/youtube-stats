import { React } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Audience({ durationObj, selectedDuration, audienceDetails, loading }) {
    let percentOfSubcribedViews = 0
    for (let i = 0; i < audienceDetails.viewsSubscriberVsNonSubscribersTrend.data.length; i++) {
        percentOfSubcribedViews += audienceDetails.viewsSubscriberVsNonSubscribersTrend.data[i]['value1']
    }

    percentOfSubcribedViews = (percentOfSubcribedViews / audienceDetails.viewsSubscriberVsNonSubscribersTrend.data.length).toFixed(2)
    return (
        <>
            <h5>Audience</h5>
            <p className="light-text">{durationObj[selectedDuration]['from']} yo {durationObj[selectedDuration]['to']}</p>
            <div className="p-4 graph-container shadow custom-rounded">
                {
                    loading ? (<div className="d-flex justify-content-center align-items-center h-100"><Spinner animation="border" variant="primary" /></div>)
                        :
                        (<>
                            <p className="light-text fs-12">Subscriber views vs total views</p>
                            <h4>{percentOfSubcribedViews}%</h4>
                            {
                                audienceDetails.viewsSubscriberVsNonSubscribersTrend.change.percentage > 0 ?
                                    <p className="fs-10 text-success">+{audienceDetails.viewsSubscriberVsNonSubscribersTrend.change.percentage}%</p>
                                    :
                                    <p className="fs-10 text-danger">{audienceDetails.viewsSubscriberVsNonSubscribersTrend.change.percentage}%</p>
                            }
                            <hr />
                            <ResponsiveContainer width="100%" height="70%">
                                <LineChart
                                    data={audienceDetails.viewsSubscriberVsNonSubscribersTrend.data}
                                    margin={{
                                        left: -14
                                    }}
                                >

                                    <XAxis hide={true} dataKey="date" />
                                    <YAxis unit="%" axisLine={false} />
                                    <Tooltip />
                                    <Legend />
                                    <Line unit="%" name="subscribers" dot={false} legendType="square" type="linear" dataKey="value1" stroke="#82ca9d" />
                                    <Line unit="%" name="non-subscriber" dot={false} legendType="square" type="linear" dataKey="value2" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </>
                        )
                }
            </div>
        </>
    )
}

export default Audience