import React from 'react';
import PropType from 'prop-types';
import { nanoid } from '@reduxjs/toolkit';
import 'assets/styles/globals.scss';
import './error-boundary.css';

class ErrorBoundary extends React.Component {

    constructor(props) {

        super(props);
        this.state = { error: null, errorInfo: null };

    }

    componentDidCatch(error, errorInfo) {

        this.setState({ error, errorInfo });

    }

    render() {

        const { error, errorInfo } = this.state;
        const { children } = this.props;

        if (errorInfo) {

            return (
                <div className="error-boundary">

                    <div className="error-boundary__wrapper">


                        <h1 className="error-boundary__heading">Something went wrong</h1>

                        {
                            error && (
                                <h4 className="error-boundary__title">
                                    {error.toString().split(': ')[1]}
                                </h4>
                            )
                        }

                        <ul className="error-boundary__details">
                            {
                                errorInfo
                                    .componentStack
                                    .split('\n')
                                    .filter((x) => x !== '')
                                    .map((x) => (

                                        <li key={nanoid()} className="error-boundary__details-item">{x}</li>

                                    ))
                            }
                        </ul>

                    </div>
                </div>
            );

        }

        return children;

    }

}

ErrorBoundary.propTypes = {

    children: PropType.node.isRequired

};

export { ErrorBoundary };
