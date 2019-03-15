import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { Map } from 'immutable'
import AppLoader from './appLoader'
import appMiddleware from './appMiddleware'
import reducer from './reducer'
import config from './config'
import appFactory from './appFactory'
import { getGlobal } from '@ttkjs/utils'
var globalObj = getGlobal()

export default function start() {
	const currentConfig = config.current

	appFactory.registerApps(currentConfig.apps)

	var mw = [appMiddleware(currentConfig.actionInjections || {}, currentConfig.reducerInjections || {})]

	if (currentConfig.middlewares)
		mw = mw.concat(currentConfig.middlewares)

	const store = createStore(reducer, Map(), applyMiddleware(...mw))

	globalObj.reduxStore = store
	globalObj.__maka_store__ = store

	if (!currentConfig.rootWrapper) {
		currentConfig.rootWrapper = (child) => {
			return child
		}
	}

	render(
		currentConfig.rootWrapper((
			<Provider store={store}>
				<AppLoader name={currentConfig.startAppName} />
			</Provider>
		)),
		document.getElementById(currentConfig.targetDomId)
	)
}