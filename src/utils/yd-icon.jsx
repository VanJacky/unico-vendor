import PropTypes from 'prop-types';

function YDIcon({ src, alt = 'Icon', className = 'w-7 h-7' }) {
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            aria-hidden="true"
        />
    );
}

YDIcon.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    className: PropTypes.string,
};

export default YDIcon;