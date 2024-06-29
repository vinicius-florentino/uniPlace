export default function getErrorsMessage(errors) {
    const errorMessages = Object.values(errors);

    const firstErrorMessage = errorMessages[0];
    const remainingErrorsCount = errorMessages.length - 1;

    let message = firstErrorMessage;
    if (remainingErrorsCount > 0) {
        message += ` (+ ${remainingErrorsCount} erro(s) adicionais)`;
    }

    return message;
}
