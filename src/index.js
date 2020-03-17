import React, { useState } from 'react'

export const blank = (value) => typeof value == 'undefined' || value == null || value == ''

export const empty = (object) => {
    let is

    for (const [key, value] of Object.entries({ ...object })) {
        if (is == false) {
            return false
        }

        if (value instanceof Array) {
            is = value.length == 0

            continue
        }

        if ((typeof value == 'object') && ((value instanceof Array) == false)) {
            is = empty(value)

            continue
        }

        is = (typeof value == 'undefined') || (value == null) || (value == '')
    }

    return is == true
}

export const useRules = (userDefined) => {
    const [rules, setRules] = useState({
        optional: (value) => true,
        max: (value, length) => (value || '').length <= length,
        min: (value, length) => (value || '').length >= length,
        present: (value) => typeof value != 'undefined',
        required: (value) => value != '' && value != null,
        url: (value) => {
            try {
                new URL(value)
            } catch (error) {
                return false
            }

            return true
        },
        ...userDefined,
    })

    return [rules, setRules]
}

export const useMessages = (userDefined) => {
    const [messages, setMessages] = useState({
        _generic: `There is an error with :attribute`,
        optional: ``,
        max: `:attribute is too long`,
        min: `:attribute is too short`,
        present: `:attribute is missing`,
        required: `:attribute is missing`,
        url: `:attribute is not a valid url`,
        ...userDefined,
    })
    return [messages, setMessages]
}

const useResolver = (data, schema) => {
    const resolve = (data, schema) => {
        let resolution = {}

        for (const [attribute, rules] of Object.entries({ ...schema })) {
            if (typeof rules == 'object' && (rules instanceof Array == false)) {
                resolution[attribute] = resolve(data[attribute], rules)
            } else {
                resolution[attribute] = {
                    _name: attribute,
                    _value: data[attribute],
                    _rules: schema[attribute]
                }
            }
        }

        return resolution
    }

    return resolve(data, schema)
}

export const useValidator = (options = {}) => {
    const [rules, setRules] = useRules(options.rules || {})
    const [messages, setMessages] = useMessages(options.messages || {})

    const validate = (resolution) => {
        let errors = {}

        for (const [attribute, some] of Object.entries({ ...resolution })) {
            if (typeof some == 'object' && ! some.hasOwnProperty('_value') && ! some.hasOwnProperty('_rules')) {
                errors[attribute] = validate(some)
            } else {
                errors[attribute] = validateAttribute(
                    some._name  || null,
                    some._value || null,
                    some._rules || []
                )
            }
        }

        return errors
    }

    const validateAttribute = (name = null, value = null, ruleset = []) => {
        if (ruleset.includes('optional') && blank(value)) {
            return []
        }

        return ruleset.map((rule) => {
            const [method, params] = rule.split(':')

            if (method == 'optional' && ((value == null) || (value == ''))) {
                return
            }

            if (typeof params != 'undefined') {
                return rules[method](value, params.split(',')) == false && messages[method].replace(':attribute', name)
            }

            return rules[method](value) == false && messages[method].replace(':attribute', name)
        }).filter((error) => {
            return typeof error != 'undefined' && error != false
        })
    }

    const validator = (model, schema) => {
        const resolution = useResolver(model, schema)
        const errors = validate(resolution)
        const validates = empty(errors)

        return [validates, errors]
    }

    return validator
}
