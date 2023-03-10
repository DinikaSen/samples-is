/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { FlexboxGrid, Panel } from "rsuite";
import 'chart.js/auto';

export default function GraphsSection() {

    function checkIfJSONisEmpty(obj) {

        return Object.keys(obj).length === 0;
    }

    function nameToMonth(data) {

        const months = [ "January", "Feburary", "March", "April", "May", "June", "July", "Augest", "September",
            "October", "November", "December" ];

        data.forEach(mapFuction);

        function mapFuction(crytpo, index) {
            crytpo.name = months[index];
        }

        return data;
    }

    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=12");
            const data = await res.json();

            const dataValues = nameToMonth(data.data);

            setChartData({
                datasets: [
                    {   
                        backgroundColor: [
                            "#ffbb11",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0"
                        ],
                        borderColor: "rgb(255, 99, 132)",
                        data: dataValues.map((crypto) => crypto.priceUsd > 10 ? Math.random() * 8 : crypto.priceUsd),
                        fill: true,
                        label: "Price in USD"
                    }
                ],
                labels: data.data.map((crypto) => crypto.name)
            });
        };

        fetchPrices();
    }, []);

    const [ chartData, setChartData ] = useState({});

    return (
        <div>
            <h4>Detailed Information</h4>

            <br />

            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={ 12 }>
                    {
                        !checkIfJSONisEmpty(chartData)
                            ? (<Panel bordered>
                                <Line
                                    data={ chartData }
                                    options={ {
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: "bottom"
                                            },
                                            title: {
                                                display: true,
                                                text: "Connection Rates"
                                            }
                                        }
                                    } } />
                            </Panel>)
                            : <></>
                    }
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={ 12 }>
                    {
                        !checkIfJSONisEmpty(chartData)
                            ? (<Panel >
                                <Bar
                                    data={ chartData }
                                    options={ {
                                        plugins: {
                                            legend: {
                                                display: true,
                                                position: "bottom"
                                            },
                                            title: {
                                                display: true,
                                                text: "Connection Prices"
                                            }
                                        }
                                    } } />
                            </Panel>)
                            : <></>
                    }
                </FlexboxGrid.Item>
            </FlexboxGrid>

        </div>
    );
}
