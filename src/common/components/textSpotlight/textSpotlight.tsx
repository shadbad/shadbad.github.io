import './text-spotlight.scss';

function TextSpotlight({ className, children }: propTypes) {
    return (
        <span className={`text-spotlight ${className}`} data-before={children}>
            {children}
        </span>
    );
}

type propTypes = {
    className?: string;
    children: string;
};

TextSpotlight.defaultProps = {
    className: ''
};

export { TextSpotlight };
