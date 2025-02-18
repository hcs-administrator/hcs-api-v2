require('dotenv').config()
const https = require('https');
const axios = require('axios')

const { parseStringPromise } = require('xml2js');

const load_pc_users = async () => {

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    const url = `https://pcserver.hcs.net.nz:9192/rpc/api/xmlrpc`
    const token = process.env.PAPERCUT_TOKEN
    const config = {
        timeout: 900,
        headers: {
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        },
        httpsAgent: agent
    };

    const xmlBodyStr = `
        <?xml version="1.0"?>
        <methodCall>
        <methodName>api.listUserAccounts</methodName>
        <params>
        <param>
        <value>${token}</value>
        </param>
        <param>
        <value>
        <int>0</int>
        </value>
        </param>
        <param>
        <value>
        <int>0</int>
        </value>
        </param>
        </params>
        </methodCall>`

    return await axios.post(url, xmlBodyStr, config)
        .then(async resp => {

            const convert = await parseStringPromise(resp.data)
            const all_users = convert.methodResponse.params[0].param[0].value[0].array[0].data[0].value
            return all_users
        })
        .catch(err => err)
}

const load_pc_details = async (user) => {

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    const url = `https://pcserver.hcs.net.nz:9192/rpc/api/xmlrpc`
    const token = process.env.PAPERCUT_TOKEN
    const config = {
        //timeout: 3000,
        headers: {
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        },
        httpsAgent: agent
    };
    
    const request = `
    <?xml version="1.0" encoding="UTF-8"?>
    <methodCall>
        <methodName>api.getUserProperties</methodName>
        <params>
            <param>
                <value>
                    <string>${token}</string>
                </value>
            </param>
            <param>
                <value>
                    <string>${user}</string>
                </value>
            </param>
            <param>
                <value>
                    <array>
                        <data>
                            <value>
                                <string>full-name</string>
                            </value>
                            <value>
                                <string>email</string>
                            </value>
                            <value>
                                <string>balance</string>
                            </value>
                            <value>
                                <string>department</string>
                            </value>
                            <value>
                                <string>office</string>
                            </value>
                            <value>
                                <string>Internal</string>
                            </value>
                            <value>
                                <string>print-stats.page-count</string>
                            </value>
                            <value>
                                <string>print-stats.job-count</string>
                            </value>
                        </data>
                    </array>
                </value>
            </param>
        </params>
    </methodCall>    
    `

    return await axios.post(url, request, config)
        .then(async resp => {

            const convert = await parseStringPromise(resp.data)

            const all_details = convert.methodResponse.params[0].param[0].value[0].array[0].data[0].value
            return all_details
        })
        .catch(err => err)
}

const add_user = async (username, password, fullname, email, card, pin) => {

    console.log(username, password, fullname, email, card, pin)

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    const url = `https://pcserver.hcs.net.nz:9192/rpc/api/xmlrpc`
    const token = process.env.PAPERCUT_TOKEN
    const config = {
        timeout: 900,
        headers: {
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        },
        httpsAgent: agent
    };

    const xmlBodyStr = `
    <?xml version="1.0" encoding="UTF-8"?>
    <methodCall>
    <methodName>api.addNewInternalUser</methodName>
    <params>
        <param>
            <value>
                <string>${token}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${username}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${password}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${fullname}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${email}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${card}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${pin}</string>
            </value>
        </param>
        <param>
            <value>
                <boolean>0</boolean>
            </value>
        </param>
    </params>
    </methodCall>`

    return await axios.post(url, xmlBodyStr, config)
        .then(async resp => {

            const convert = await parseStringPromise(resp.data)
            const user = convert.methodResponse.params[0].param[0].value[0].array[0].data[0].value
            return user
        })
        .catch(err => err)
}

const remove_user = async (name) => {

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    const url = `https://pcserver.hcs.net.nz:9192/rpc/api/xmlrpc`
    const token = process.env.PAPERCUT_TOKEN
    const config = {
        timeout: 900,
        headers: {
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        },
        httpsAgent: agent
    };

    const xmlBodyStr = `
    <?xml version="1.0" encoding="UTF-8"?>
    <methodCall>
    <methodName>api.deleteExistingUser</methodName>
    <params>
        <param>
        <value>
            <string>${token}</string>
        </value>
        </param>
        <param>
        <value>
            <string>${name}</string>
        </value>
        </param>
    </params>
    </methodCall>`

    return await axios.post(url, xmlBodyStr, config)
        .then(async resp => {

            const convert = await parseStringPromise(resp.data)
            const user = convert.methodResponse.params[0].param[0].value[0].array[0].data[0].value

            console.log(user)

            return user
        })
        .catch(err => err)
}

const set_user_balance = async (name, amount, comment) => {

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    const url = `https://pcserver.hcs.net.nz:9192/rpc/api/xmlrpc`
    const token = process.env.PAPERCUT_TOKEN
    const config = {
        timeout: 900,
        headers: {
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        },
        httpsAgent: agent
    };

    const xmlBodyStr = `
    <?xml version="1.0" encoding="UTF-8"?>
    <methodCall>
    <methodName>api.setUserAccountBalance</methodName>
    <params>
        <param>
            <value>
                <string>${token}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${name}</string>
            </value>
        <param>
        </param>
            <value>
                <double>${amount}</double>
            </value>
            <value>
                <string>${comment}</string>
            </value>
        </param>
    </params>
    </methodCall>`

    return await axios.post(url, xmlBodyStr, config)
        .then(async resp => {

            const convert = await parseStringPromise(resp.data)
            const user = convert.methodResponse.params[0].param[0].value[0].array[0].data[0].value

            return user
        })
        .catch(err => err)
}

const set_property = async (name, property, value) => {

    const agent = new https.Agent({  
        rejectUnauthorized: false
    });

    console.log(name, property, value)

    const url = `https://pcserver.hcs.net.nz:9192/rpc/api/xmlrpc`
    const token = process.env.PAPERCUT_TOKEN
    const config = {
        timeout: 900,
        headers: {
            'Accept': 'text/xml',
            'Content-Type': 'text/xml'
        },
        httpsAgent: agent
    };

    const xmlBodyStr = `
    <?xml version="1.0" encoding="UTF-8"?>
    <methodCall>
    <methodName>api.setUserProperty</methodName>
    <params>
        <param>
            <value>
                <string>${token}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${name}</string>
            </value>
        </param>
        <param>
            <value>
                <string>${property}</string>
            </value>
            <value>
                <string>${value}</string>
            </value>
        </param>
    </params>
    </methodCall>`

    return await axios.post(url, xmlBodyStr, config)
        .then(async resp => {

            const convert = await parseStringPromise(resp.data)
            const user = convert.methodResponse.params[0].param[0].value[0].array[0].data[0].value

            return user
        })
        .catch(err => err)
}

module.exports = { load_pc_users, load_pc_details, add_user, remove_user, set_user_balance, set_property }