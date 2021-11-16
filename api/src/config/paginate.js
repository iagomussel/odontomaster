module.exports=(page=1)=>{
    let config = {
        per_page: 10,
    }
    

    return{
        limit:config.per_page,
        offset:(page-1)*per_page
    }

}