# @overmise/use-validator

> Validation hook for React

[![NPM](https://img.shields.io/npm/v/@overmise/use-validator.svg)](https://www.npmjs.com/package/@overmise/use-validator) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @overmise/use-validator
```

## Usage

```jsx
import React, { useEffect, useState } from 'react'
import { useValidator, useError } from '@overmise/use-validator'

const SCHEMA = {
    username: '',
    email: '',
    password: ''
}

const Form = () => {
    const validator = useValidator()
    const [firstError, hasError] = useError()
    const [data, setData] = useState(SCHEMA)
    const [errors, setErrors] = useState(SCHEMA)

    const handleSubmit = (event) => {
        event.preventDefault()

        const [validates, errors] = validator(data, {
            username: ['required', 'min:3', 'max:255'],
            email: ['required', 'email'],
            password: ['required', 'min:8']
        })

        setErrors(errors)

        if (validates) {
            // Perform request...
            console.log(data)
        } else {
            console.error(errors)
        }
    }

    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <fieldset>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    value={data.username}
                    onChange={(event) => setData({ ...data, username: event.target.value })}
                    styles={hasError(errors.username) ? { border: '1px solid red' } : { border: '1px solid #ccc' }}
                />
                {hasError(errors.username) && <span>{firstError(errors.username)}</span>}
            </fieldset>
            <fieldset>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(event) => setData({ ...data, email: event.target.value })}
                    styles={hasError(errors.email) ? { border: '1px solid red' } : { border: '1px solid #ccc' }}
                />
                {hasError(errors.email) && <span>{firstError(errors.email)}</span>}
            </fieldset>
            <fieldset>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={(event) => setData({ ...data, password: event.target.value })}
                    styles={hasError(errors.password) ? { border: '1px solid red' } : { border: '1px solid #ccc' }}
                />
                {hasError(errors.password) && <span>{firstError(errors.password)}</span>}
            </fieldset>
        </form>
    )
}
```

## License

MIT © [Ben Villiere](https://github.com/benvilliere)
