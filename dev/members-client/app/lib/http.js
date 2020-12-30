import Axios from "axios";
import { eventBus as processingDialogEventHub } from '../components/ProcessingDialog';

export function postWithProcessingDialog(url, data, waitUntilDialogClosed = false) {
    processingDialogEventHub.$emit("open");
    return Axios.post(url, data).then(response => {
        processingDialogEventHub.$emit("completed", response);
        if (waitUntilDialogClosed) {
            return new Promise(resolve => {
                const closedEventHandler = () => {
                    resolve(response);
                    processingDialogEventHub.$off("closed", closedEventHandler);
                };
                processingDialogEventHub.$on("closed", closedEventHandler);
            });
        } else {
            return response;
        }
    }).catch(error => {
        processingDialogEventHub.$emit("completed", error.response.data)
        return error;
    });
}