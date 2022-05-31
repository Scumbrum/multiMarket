export const SERVER = "http://localhost:4000/"

export const ERROR_HENDLER = ({graphQLErrors, networkError, ...rest}) => {
    if(graphQLErrors) {
        const errors = graphQLErrors.reduce((exist, error) => 
            exist.push(error.message)
        ,[])
        alert(errors.join("\r"))
        return
    } else if(networkError) {
        console.error(networkError.message)
        return
    } 
    console.error(rest)
}