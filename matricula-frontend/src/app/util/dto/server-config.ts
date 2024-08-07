export class ServerConfig {
    private static readonly serverApi:string="https://matricula-backend-gvua.onrender.com";

    public static concatBackendAPI(router:string){
        return this.serverApi.concat(router);
    }
}
