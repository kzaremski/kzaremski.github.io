/**
 * Bootstrap Card Component for React
 * @param {Object} props - React properties object
 * @returns JSX component
 */
const Card = (props) => {
    const variant = props.variant ? props.variant : 'primary';

    return (
        <div className={`card bg-${variant} shadow-soft border-light mb-4`}>
            <div className='card-body'>
                {props.children}
            </div>
        </div>
    )
}

export {
    Card
};
