export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

     const applyFiltering = (query, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if(action && action.name === 'clear') {
            const parent = action.parentElement;
            const inp = parent.querySelector('input');
            const dataField = action.dataset.field;
            inp.value = '';
            state[dataField] = '';
        }
        
        const adapted = {...state};
        if (adapted.totalFrom || adapted.totalTo) {
            adapted.total = [adapted.totalFrom ? adapted.totalFrom : undefined, adapted.totalTo ? adapted.totalTo : undefined];
            delete adapted.totalFrom;
            delete adapted.totalTo;
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {
                    filter[`filter[${elements[key].name}]`] = elements[key].value;
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    }
    return {
        updateIndexes,
        applyFiltering
    }
}