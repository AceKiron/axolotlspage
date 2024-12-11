import LatestItemModel from "../models/latestItem.model";
import PostModel from "../models/post.model";
import SourceModel from "../models/source.model";
import CatchErrors from "../utils/catchErrors";

export const updateLatestHandler = CatchErrors(async (req, res) => {
    Promise.all((await LatestItemModel.find().sort({ timestamp: -1 }).limit(16)).map(async (item) => {
        const result = {
            kind: item.kind,
            timestamp: item.timestamp,
            username: item.username
        };

        if (item.kind == "SOURCE_RECVEIVED_REVIEW") {
            const source = await SourceModel.findById(item.sourceId);
            return {
                ...result,
                source: {
                    id: item.sourceId,
                    link: source!.link
                }
            };
        } else if (item.kind == "POST_EDITED" || item.kind == "POST_PUBLISHED") {
            const post = await PostModel.findById(item.postId);
            return {
                ...result,
                post: {
                    id: item.postId,
                    urlName: post!.urlName,
                    displayName: post!.displayName
                }
            };
        } else if (item.kind == "USER_REGISTERED") {
            return {
                ...result
            };
        }

        return result;
    })).then((results) => {
        res.send(results);
    });
});