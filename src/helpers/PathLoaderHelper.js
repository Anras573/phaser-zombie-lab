import { dist } from './Constants'

export default class PathLoaderHelper {
    static PathToAsset(asset) {
        return `${dist}/${asset}`
    }
}
