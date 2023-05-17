export default function convertDate(str) {
    const dateObj = new Date(str)
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = dateObj.toLocaleDateString('en-US', options)
    return formattedDate
}
