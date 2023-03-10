/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
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

//import { CustomHtmlHeading } from "@b2bsample/shared/ui/ui-basic-components";
//import Image from "next/image";
import { Button, Divider, FlexboxGrid, Panel, Stack } from "rsuite";
import ImageIcon from "@rsuite/icons/Image";
import MediaIcon from "@rsuite/icons/Media";
import FolderFillIcon from "@rsuite/icons/PlusRound";
import FileUploadIcon from "@rsuite/icons/FileUpload";
import PlayOutlineIcon from "@rsuite/icons/PlayOutline";
import 'chart.js/auto';
//import reportsImage from "../../../../../../../../libs/business-app/ui-assets/src/lib/images/reports.svg";

import React, { useEffect, useState } from 'react'
import { Bar, Doughnut } from "react-chartjs-2";
import SettingsTitle from "../../../../../common/settingsTitle";

export default function ReportsComponent1() {

    function checkIfJSONisEmpty(obj) {

        return Object.keys(obj).length === 0;
    }

    const [ chartData, setChartData ] = useState({
        datasets: [],
        labels: []
    });

    const usageData = {
        datasets: [
            {   
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1,
                data: [ 20, 5 ],
                label: "Storage"
            }
        ],
        labels: [ "Used", "Available" ]
    };

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

    return (
        <div style={ { margin: "1rem" } }>
            <br />
            <Stack direction="column" alignItems="flex-start" spacing={ 30 } style={ { width: "100%" } }>
                <FlexboxGrid justify="start">
                    <FlexboxGrid.Item key={ 0 } colspan={ 24 }>
                        <SettingsTitle title="Cloud Storage Usage" subtitle="Indepth details of your cloud space" />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
                <></>
            </Stack>

            <h4>Data Usage</h4>
            <br />

            <FlexboxGrid justify="space-between">
                <FlexboxGrid.Item colspan={ 9 } >
                    <Panel bordered >
                        <Doughnut data={ usageData } />
                    </Panel>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item colspan={ 14 }>

                    <h5>Details</h5>
                    <br />

                    <FlexboxGrid justify="space-between" style={ { marginBottom: "16px" } }>
                        <FlexboxGrid.Item key={ 0 } colspan={ 12 }>
                            <IndividualCard title="Photos" value="100">
                                <ImageIcon style={ { fontSize: "3em" } } />
                            </IndividualCard>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item key={ 0 } colspan={ 11 }>
                            <IndividualCard title="Videos" text="320">
                                <MediaIcon style={ { fontSize: "3em" } } />
                            </IndividualCard>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <FlexboxGrid justify="space-between" style={ { marginBottom: "16px" } }>
                        <FlexboxGrid.Item key={ 0 } colspan={ 12 }>
                            <IndividualCard title="Music" text="189">
                                <PlayOutlineIcon style={ { fontSize: "3em" } } />
                            </IndividualCard>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item key={ 0 } colspan={ 11 }>
                            <IndividualCard title="Files" text="872">
                                <FolderFillIcon style={ { fontSize: "3em" } } />
                            </IndividualCard>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>

                    <Divider />

                    <FlexboxGrid justify="space-between" style={ { marginBottom: "16px" } }>
                        <FlexboxGrid.Item key={ 0 } colspan={ 24 }>

                            <Panel bordered style={ { height: "19vh" } }>
                                <div
                                    style={ {
                                        alignItems: "center",
                                        display: "flex",
                                        height: "15vh",
                                        justifyContent: "center",
                                        width: "100%"
                                    } }>
                                    <Stack direction="column" spacing={ 10 }>
                                        <FileUploadIcon style={ { fontSize: "3em" } } />
                                        <p>Import files to the cloud</p>
                                    </Stack>

                                </div>

                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </FlexboxGrid.Item>
            </FlexboxGrid>

            <br />

            <Divider />

            <h4>Monthly Usage</h4>
            <br />

            {
                checkIfJSONisEmpty(chartData)
                    ? <></>
                    : (<Bar
                        data={ chartData }
                        options={ {
                            plugins: {
                                legend: {
                                    display: true,
                                    position: "bottom"
                                }
                            }
                        } } />)
            }

        </div>
    );
}

function IndividualCard(prop) {

    const { children, title, value } = prop;

    return (
        <Panel bordered>
            <FlexboxGrid align="middle" justify="space-between">
                <FlexboxGrid.Item key={ 1 } colspan={ 18 }>
                    <FlexboxGrid align="middle" justify="start">
                        <FlexboxGrid.Item key={ 1 - 1 } colspan={ 6 }>
                            <div>
                                { children }
                            </div>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item key={ 1 - 2 } colspan={ 18 }>
                            <h3>{ title }</h3>
                            <h5 style={ { fontWeight: "normal" } }>{ value } Files</h5>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </FlexboxGrid.Item>

                <FlexboxGrid.Item key={ 0 } colspan={ 6 }>
                    <h6>5 GB</h6>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );

    // return (
    //     <Panel bordered>
    //         <FlexboxGrid align="middle">
    //             <FlexboxGrid.Item colspan={ 16 }>
    //                 <Stack direction="column" alignItems="flex-start" spacing={ 30 }>
    //                     <Stack direction="column" alignItems="flex-start" spacing={ 10 }>
    //                         <CustomHtmlHeading
    //                             content="Looks like you don’t have Reports feature enabled"
    //                             headingType="h4"
    //                             fontWeight="normal" />

    //                         <Button appearance="primary">
    //                             Upgrade to unlock this feature
    //                         </Button>
    //                     </Stack>


    //                     <Stack direction="column" alignItems="flex-start" spacing={ 10 }>
    //                         <CustomHtmlHeading
    //                             content="What you will get..."
    //                             headingType="h6" />

    //                         <ul>
    //                             <li>24x7 service</li>
    //                             <li>Capability to view your previous claim reports</li>
    //                             <li>Auto Attendant and IVR</li>
    //                             <li>Special discounts for our other <a href=""><u>features</u></a></li>
    //                         </ul>
                            
    //                     </Stack>
    //                 </Stack>
    //             </FlexboxGrid.Item>
    //             <FlexboxGrid.Item colspan={ 8 }>
    //                 <Image src={ reportsImage } alt="reports image" width={ 300 } />
    //             </FlexboxGrid.Item>
    //         </FlexboxGrid>

    //     </Panel>
    // );
}
