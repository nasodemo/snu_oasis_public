// import KeywordInput from './KeywordInput'
import DelWord from './deleteWord'
import DelAll from './deleteAll'
import Questionshandel from './deleteQuetion'
export default function page() {
    return (
    <div>
        <h1>Admin Page</h1>
        <br/>
        <DelAll></DelAll>
        <br/>
        <br/>
        <DelWord></DelWord>
        <br/>
        <br/>
        {/* <Questionshandel></Questionshandel> */}
    </div>
    )
}