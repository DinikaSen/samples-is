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

import React, { useCallback, useEffect, useState } from "react";
import { Table } from "rsuite";

export default function TableSection() {

    const makeid = (length) => {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;

        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    };

    const nameToMonth = useCallback((data) => {

        const months = [ "January", "Feburary", "March", "April", "May", "June", "July", "Augest", "September",
            "October", "November", "December" ];

        data.forEach(mapFuction);

        function mapFuction(crytpo, index) {
            crytpo.name = months[index];
            crytpo.id = index + 1;
            crytpo.symbol = makeid(4);
            crytpo.supply = (parseFloat(crytpo.supply) / 10000000).toFixed(0);
            crytpo.priceUsd = (parseFloat(crytpo.priceUsd)).toFixed(2);

        }

        return data;
    }, []);

    const [ data, setData ] = useState({});

    useEffect(() => {
        const fetchPrices = async () => {
            const res = await fetch("https://api.coincap.io/v2/assets/?limit=10");
            const data = await res.json();

            setData(nameToMonth(data.data));
        };

        fetchPrices();
    }, [ nameToMonth ]);

    const { Column, HeaderCell, Cell } = Table;

    return (
        <div>
            <h4>Monthly Overview</h4>

            <br />

            <Table
                height={ 600 }
                data={ data }
            >
                <Column width={ 200 } align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={ 150 }>
                    <HeaderCell>Symbol</HeaderCell>
                    <Cell dataKey="symbol" />
                </Column>

                <Column width={ 150 }>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={ 100 }>
                    <HeaderCell>Rank</HeaderCell>
                    <Cell dataKey="rank" />
                </Column>

                <Column flexGrow={ 1 }>
                    <HeaderCell>Number of Connections</HeaderCell>
                    <Cell dataKey="supply" />
                </Column>

                <Column flexGrow={ 2 }>
                    <HeaderCell>Connetion Price</HeaderCell>
                    <Cell dataKey="priceUsd" />
                </Column>
            </Table>
        </div>

    );
}
