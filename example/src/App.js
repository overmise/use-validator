import React, { useCallback, useEffect, useState } from 'react'
import { useValidator, useError } from '@overmise/use-validator'

export const useEscape = (fn) => {
    const escape = useCallback((event) => {
        if (event.keyCode === 27) {
            fn(event)
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', escape, false);

        return () => {
            document.removeEventListener('keydown', escape, false);
        };
    }, []);
}

const SCHEMA = {
    user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    },
    company: {
        name: '',
        url: ''
    }
}

const RULES = {
    user: {
        firstname: ['required', 'min:3', 'max:255'],
        lastname: ['required', 'min:3', 'max:255'],
        email: ['required', 'email'],
        password: ['required', 'min:6', 'max:255'],
    },
    company: {
        name: ['required', 'min:3', 'max:255'],
        website: ['optional', 'url']
    }
}

const Container = ({ children }) => (
    <div className="flex flex-col w-screen h-screen bg-gray-200">
        {children}
    </div>
)

const Success = () => (
    <div className="w-full p-6 m-auto my-6 max-w-lg bg-white rounded-lg shadow-lg">
        <h1 className="w-full px-3 mb-6 text-2xl">
            Bravo!
        </h1>
        <p className="w-full px-3 mb-6 text-gray-700">
            You have successfully filled the form.
        </p>
    </div>
)

const Form = ({ handleSubmit, setData, data, errors, hasError, firstError, validates }) => (
    <form className="w-full p-6 m-auto my-6 max-w-lg bg-white rounded-lg shadow-lg" onSubmit={(event) => handleSubmit(event)}>
        {! validates &&
            <div className="w-full p-3 m-auto mb-6 max-w-lg bg-white rounded-lg shadow-sm bg-red-200 text-red-800 text-sm">
                <strong>Oops!</strong><br />
                There are errors with this form. Please review the fields below before you submit.
            </div>
        }
        <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="w-full px-3 mb-6 text-2xl font-light">
                Personal details
            </h2>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                    First Name
                </label>
                <input
                    className={`
                        appearance-none block w-full
                        bg-gray-200 text-gray-700
                        border border-gray-200 ${hasError(errors.user.firstname) && `border-red-500`}
                        rounded py-3 px-4 mb-3
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                    `.trim()}
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane"
                    onChange={(event) => setData({ ...data, user: { ...data.user, firstname: event.target.value }})}
                />
                {hasError(errors.user.firstname) &&
                    <p className="text-red-500 text-xs italic">{firstError(errors.user.firstname)}</p>
                }
            </div>
            <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                    Last Name
                </label>
                <input
                    className={`
                        appearance-none block w-full
                        bg-gray-200 text-gray-700
                        border border-gray-200 ${hasError(errors.user.lastname) && `border-red-500`}
                        rounded py-3 px-4 mb-3
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                    `.trim()}
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe"
                    onChange={(event) => setData({ ...data, user: { ...data.user, lastname: event.target.value }})}
                />
                {hasError(errors.user.lastname) &&
                    <p className="text-red-500 text-xs italic">{firstError(errors.user.lastname)}</p>
                }
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                    Email
                </label>
                <input
                    className={`
                        appearance-none block w-full
                        bg-gray-200 text-gray-700
                        border border-gray-200 ${hasError(errors.user.email) && `border-red-500`}
                        rounded py-3 px-4 mb-3
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                    `.trim()}
                    id="grid-email"
                    type="email"
                    placeholder="jane@doe.com"
                    onChange={(event) => setData({ ...data, user: { ...data.user, email: event.target.value }})}
                />
                {hasError(errors.user.email) &&
                    <p className="text-red-500 text-xs italic">{firstError(errors.user.email)}</p>
                }
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                    Password
                </label>
                <input
                    className={`
                        appearance-none block w-full
                        bg-gray-200 text-gray-700
                        border border-gray-200 ${hasError(errors.user.password) && `border-red-500`}
                        rounded py-3 px-4 mb-3
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                    `.trim()}
                    id="grid-password"
                    type="password"
                    placeholder="******************"
                    onChange={(event) => setData({ ...data, user: { ...data.user, password: event.target.value }})}
                />
                {hasError(errors.user.password) &&
                    <p className="text-red-500 text-xs italic">{firstError(errors.user.password)}</p>
                }
                <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
            </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="w-full px-3 mb-6 text-2xl font-light">
                Company information
            </h2>
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                    Company name
                </label>
                <input
                    className={`
                        appearance-none block w-full
                        bg-gray-200 text-gray-700
                        border border-gray-200 ${hasError(errors.company.name) && `border-red-500`}
                        rounded py-3 px-4 mb-3
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                    `.trim()}
                    id="grid-name"
                    type="text"
                    placeholder="ACME"
                    onChange={(event) => setData({ ...data, company: { ...data.company, name: event.target.value }})}
                />
                {hasError(errors.company.name) &&
                    <p className="text-red-500 text-xs italic">{firstError(errors.company.name)}</p>
                }
            </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-name">
                    Company website
                </label>
                <input
                    className={`
                        appearance-none block w-full
                        bg-gray-200 text-gray-700
                        border border-gray-200 ${hasError(errors.company.website) && `border-red-500`}
                        rounded py-3 px-4 mb-3
                        leading-tight
                        focus:outline-none focus:bg-white focus:border-gray-500
                    `.trim()}
                    id="grid-website"
                    type="url"
                    placeholder="https://acme.xyz"
                    onChange={(event) => setData({ ...data, company: { ...data.company, website: event.target.value }})}
                />
                {hasError(errors.company.website) &&
                    <p className="text-red-500 text-xs italic">{firstError(errors.company.website)}</p>
                }
            </div>
        </div>
        <div className="flex w-full">
            <button type="submit" className="ml-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Submit
            </button>
        </div>
    </form>
)

const App = () => {
    const validator = useValidator()
    const [validates, setValidates] = useState(true)
    const [firstError, hasError] = useError()
    const [data, setData] = useState(SCHEMA)
    const [errors, setErrors] = useState(SCHEMA)
    const [submitted, setSubmitted] = useState(false)
    const [processed, setProcessed] = useState(false)

    const validateData = () => {
        const [validates, errors] = validator(data, RULES)
        setValidates(validates)
        setErrors(errors)

        return validates
    }

    useEffect(() => {
        submitted && validateData()
    }, [data])

    useEscape(() => {
        setSubmitted(false)
        setErrors(SCHEMA)
    })

    const handleSubmit = (event) => {
        event.preventDefault()

        setSubmitted(true)

        if (validateData()) {
            setProcessed(true)
            console.log('No errors!', data)
        }
    }

    return processed ? (
        <Container>
            <Success />
        </Container>
    ) : (
        <Container>
            <Form
                handleSubmit={handleSubmit}
                setData={setData}
                data={data}
                errors={errors}
                hasError={hasError}
                firstError={firstError}
                validates={validates}
            />
        </Container>
    )
}

export default App
