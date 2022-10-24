const { useSelect, useDispatch } = wp.data
const { TextControl, Button } = wp.components


const RudrRepeaterControl = ( props ) => {


	let repeaterValues = useSelect(
		select => select('core/editor').getEditedPostAttribute('meta')?.[props.meta_key]
	);

	const { editPost } = useDispatch( 'core/editor', [ repeaterValues ] );


	return <>
		{ Array.isArray(repeaterValues) && repeaterValues.map( (row, index) => {
			return <div style={{marginBottom: '30px'}}>

				<strong>Link {index + 1}</strong>

				<TextControl
					label="Set URL"
					value={ repeaterValues[index]['url'] }
					onChange={ (value) => {

						// push our new value to repeaterValues
						repeaterValues = repeaterValues.map((row, innerIndex) => {
							return innerIndex === index ? {...row, ['url']: value} : row
						});
						editPost( { meta: { [props.meta_key]: repeaterValues } } )

					} }
				/>
				<TextControl
					label="Set site name"
					value={ repeaterValues[index]['site_name'] }
					onChange={ (value) => {

						// push our new value to repeaterValues
						repeaterValues = repeaterValues.map((row, innerIndex) => {
							return innerIndex === index ? {...row, ['site_name']: value} : row
						});
						editPost( { meta: { [props.meta_key]: repeaterValues } } )

					} }
				/>

				{ index > 0 && <Button isLink isDestructive onClick={ () => {
					repeaterValues = repeaterValues.filter((obj,loopIndex) => loopIndex !== index)
					editPost( { meta: { [props.meta_key]: repeaterValues } } )
				}}>Remove line {index + 1}
				</Button> }

			</div>
		} ) }
		<Button
			variant="secondary"
			onClick={() => {

				repeaterValues.push({})
				repeaterValues = repeaterValues.splice(0)
				//dispatch('core/editor').editPost({meta: {[meta_key]: repeaterValuesCopy}})
				editPost( { meta: { [props.meta_key]: repeaterValues } } )

			}
			}>Add Item
		</Button>
	</>
};

export default RudrRepeaterControl
