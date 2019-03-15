import { getGlobal } from '@ttkjs/utils'
var globalObj = getGlobal()
class pluginFactory {
    constructor() {
        this.plugins = []
        globalObj.__ttk_plugins__ = this.plugins
    }

    registerPlugin = (name, forApp) => {
        if (!name || !forApp) return

        if (this.plugins.findIndex(o => o.name == name) != -1) {
            console.log(`Already registered this plugin，name: ${name},please ignore`)
            return
        }

        var regExp
        if (/^\/[^\/]+\//.test(forApp)) {
            regExp = new RegExp(forApp)
        }

        this.plugins.push({
            name, forApp: forApp, regExp
        })
    }

    removePlugin = (name) => {
        if (!name) return

        var index = this.plugins.findIndex(o => o.name == name)
        if (index != -1)
            this.plugins.splice(index,1)
    }

    existsPlugin = (forApp) => {
        if (!forApp) return
        return this.plugins.findIndex(o => o.forApp === forApp || (o.regExp && o.regExp.test(forApp))) != -1
    }

    filter = (appName) => {
        if (!appName) return []

        return this.plugins.filter(o => o.forApp === appName || (o.regExp && o.regExp.test(forApp)))
    }

    getPluginNames = (appName) => {
        return this.filter(appName).map(o => o.name)
    }
}

const pluginFactoryInstance = new pluginFactory()

export default pluginFactoryInstance