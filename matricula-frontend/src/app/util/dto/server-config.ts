export class ServerConfig {
    private static readonly serverApi:string="https://matricula-nkxt.onrender.com";

    public static concatBackendAPI(router:string){
        return this.serverApi.concat(router);
    }
}
