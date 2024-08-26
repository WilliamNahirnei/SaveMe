exports.getRequestParams = function(request) {
    return {
        ...request.params,
        ...request.query,
        ...request.body
    }
}

exports.extractQueryFilters = function(request) {
    const filters = extractFilters(request.query)
    return filters
}

// Função principal que extrai os filtros do objeto de entrada
function extractFilters(inputObject) {
    const filters = {};

    for (const key in inputObject) {
        if (key.startsWith('filter')) {
            const filterObject = parseFilterObject(inputObject[key]);

            if (filterObject && filterObject.comparison && filterObject.hasOwnProperty('value')) {
                const field = formatFieldName(key);

                if (isDistanceFilter(filterObject)) {
                    filters[field] = {
                        comparison: filterObject.comparison,
                        value: filterObject.value
                    };
                } else {
                    filters[field] = {
                        comparison: filterObject.comparison,
                        value: filterObject.value
                    };
                }
            }
        }
    }

    return filters;
}

// Função para analisar o objeto JSON do filtro
function parseFilterObject(filterString) {
    try {
        return JSON.parse(filterString);
    } catch (error) {
        console.error('Invalid JSON:', filterString);
        return null;
    }
}

// Função para formatar o nome do campo (remove "filter" e transforma a primeira letra em minúscula)
function formatFieldName(key) {
    return key.replace(/^filter/, '').replace(/^./, str => str.toLowerCase());
}

// Função para verificar se o filtro é um filtro de distância válido
function isDistanceFilter(filterObject) {
    return filterObject.comparison === 'distance' &&
        filterObject.value.hasOwnProperty('latitude') &&
        filterObject.value.hasOwnProperty('longitude') &&
        filterObject.value.hasOwnProperty('radius');
}