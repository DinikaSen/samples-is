/*
 * Copyright (c) 2022 WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from 'react'
import { Divider, FlexboxGrid, Panel } from 'rsuite'
import { Bar, Line, Radar } from "react-chartjs-2";

export default function ReportsComponent() {

    function checkIfJSONisEmpty(obj) {

        return Object.keys(obj).length === 0;
    }

    const priceMap = (price)=> {
        if(price > 10) {
            return Math.random()*8;
        } else if (price < 4) {
            return Math.random()*8 - 4
        }
    }

    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=10");
            const data = await res.json()
            setChartData({
                labels: data.data.map((crypto) => crypto.name),
                datasets: [
                    {   
                        fill: true,
                        label: "Price in USD",
                        data: data.data.map((crypto) => crypto.priceUsd > 10 ? Math.random()*8 : crypto.priceUsd),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ]
                    }
                ]
            });
        };


        fetchPrices()
    }, []);

    const [chartData, setChartData] = useState({})
    console.log(chartData);
    return (
        <div>
            <br />
            <h3>Recent Information</h3>

            <FlexboxGrid justify="start">
                <FlexboxGrid.Item colspan={24}> {
                    !checkIfJSONisEmpty(chartData)
                        ? <Line data={chartData} options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Connection Rates"
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        }} />
                        : <></>
                }</FlexboxGrid.Item>
            </FlexboxGrid>

            <Divider />

            <FlexboxGrid justify="start">
                {
                    !checkIfJSONisEmpty(chartData)
                        ? <Bar data={chartData} options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Connection Prices"
                                },
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        }} />
                        : <></>
                }

            </FlexboxGrid>
           
            <Divider />
            
            <FlexboxGrid justify="start">
                {
                    !checkIfJSONisEmpty(chartData)
                        ? <Radar data={chartData} options={{
                            plugins: {
                                title: {
                                    display: true,
                                    text: "Connection Secured Prices"
                                },
                                legend: {
                                    display: false,
                                    position: "bottom"
                                }
                            }
                        }} />
                        : <></>
                }

            </FlexboxGrid>
        </div>
    )
}
