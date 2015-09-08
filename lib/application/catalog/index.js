'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('lodash/collection');

var reduce = _require.reduce;
var sortByOrder = _require.sortByOrder;

//Fake data
var componentsMetas = require('./components.json');
//service
function _synchronousSearch(query) {
    if (!query) {
        return componentsMetas;
    }
    var matchQuery = reduce(componentsMetas, function (result, comp, index) {
        var name = comp.name;
        var description = comp.description;
        var tags = comp.tags;

        var count = 0;
        if (-1 !== name.indexOf(query)) {
            count++;
        }
        if (-1 !== description.indexOf(query)) {
            count++;
        }
        if (-1 !== tags.indexOf(query)) {
            count++;
        }
        if (0 < count) {
            result[index] = { name: name, count: count, index: index };
        }
        return result;
    }, {});
    var sortedMatch = sortByOrder(matchQuery, ['count'], ['desc']);
    var sortedComponents = sortedMatch.map(function (comp) {
        return componentsMetas[comp.index];
    });
    console.log('Match', matchQuery);
    console.log('Sorted ', sortedComponents);
    return sortedComponents;
}
function searchService(options) {
    return new Promise(function (success, failure) {
        try {
            var criteria = options.data.criteria;

            var res = _synchronousSearch(criteria && criteria.query || undefined);
            success(res);
        } catch (e) {
            failure(e);
        }
    }).then(function (d) {
        return { dataList: d, totalCount: d.length };
    });
}
//<li key='button'><button onClick={()=>{console.log(searchService('My')); }}>Filter</button></li>
//dependencies
var React = require('react');
var Component = React.Component;

var ListStore = require('focus').store.ListStore;
//const types = require('focus').component.types;
//Components

var _require2 = require('../../page/list');

var ListPage = _require2.component;

var CatalogSearch = require('./catalog-search');
var CatalogList = require('./catalog-list');

var store = new ListStore({ identifier: 'COMPONENT_CATALOG' });

/**
 * Component describing a component.
 */

var ComponentCatalog = (function (_Component) {
    _inherits(ComponentCatalog, _Component);

    function ComponentCatalog(props) {
        _classCallCheck(this, ComponentCatalog);

        _Component.call(this, props);
    }

    //Static props.

    /** @inheriteDoc */

    ComponentCatalog.prototype.render = function render() {
        var store = this.props.store;

        return React.createElement(
            'div',
            { 'data-focus': 'catalog' },
            React.createElement(CatalogSearch, { store: store }),
            React.createElement(ListPage, this.props)
        );
    };

    return ComponentCatalog;
})(Component);

ComponentCatalog.displayName = 'ComponentCatalog';
ComponentCatalog.defaultProps = {
    store: store,
    service: searchService,
    ListComponent: CatalogList
};

module.exports = ComponentCatalog;