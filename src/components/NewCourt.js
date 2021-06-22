import '../index.css'

const NewCourt = () => {
    return (
        <div className='form-container'>
            <h1>Request a new court to be added to the map</h1>
            <form>
                <fieldset>
                    <label>
                        <p>Court Address</p>
                        <input name='address' />
                    </label>
                </fieldset>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default NewCourt
