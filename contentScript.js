(function() {
    // Array of first names and last names
    const firstNames = ['Jack', 'Emma', 'Oliver', 'Sophia', 'Liam', 'Ava', 'Noah', 'Isabella', 'James', 'Mia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'];

    // Utility Functions
    const getRandomString = (length) => Array.from({ length }, () => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(Math.floor(Math.random() * 52))).join('');
    const generateRandomMobileNumber = () => `${Math.floor(Math.random() * 4) + 6}${Math.floor(Math.random() * 900000000) + 100000000}`;
    const generateRandomEmail = () => `${getRandomString(5)}@gmail.com`;
    const generateRandomAddress = () => `${Math.floor(Math.random() * 1000) + 1} ${['Main St', 'Second St', 'Third St', 'First Ave', 'Second Ave'][Math.floor(Math.random() * 5)]}, City, State, 12345`;
    const generateRandomPincode = () => (Math.floor(100000 + Math.random() * 900000)).toString();
    const getRandomFirstName = () => firstNames[Math.floor(Math.random() * firstNames.length)];
    const getRandomLastName = () => lastNames[Math.floor(Math.random() * lastNames.length)];
    const generateRandomParagraph = () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

    // Retrieve associated label or placeholder text
    const getLabelText = (field) => field.labels?.[0]?.innerText.toLowerCase() || field.placeholder?.toLowerCase() || '';

    // Function to fill fields based on their type and associated labels
    const fillFormFields = () => {
        const formFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], textarea');
        const labelMapping = {
            'full name': () => `${getRandomFirstName()} ${getRandomLastName()}`,
            'first name': getRandomFirstName,
            'last name': getRandomLastName,
            'mobile': generateRandomMobileNumber,
            'email': generateRandomEmail,
            'address': generateRandomAddress,
            'pincode': generateRandomPincode,
            'postal code': generateRandomPincode,
            'zip code': generateRandomPincode,
            'textarea': generateRandomParagraph,
            'name': () => `${getRandomFirstName()} ${getRandomLastName()}`
        };

        formFields.forEach(field => {
            if (!field.disabled && !field.readOnly) {
                const labelText = getLabelText(field);
                const fieldName = field.name?.toLowerCase() || '';
                let fieldValue = null;

                // Match by label or name attribute
                for (const [key, generator] of Object.entries(labelMapping)) {
                    if (labelText.includes(key) || fieldName.includes(key.replace(' ', ''))) {
                        fieldValue = generator();
                        break;
                    }
                }

                // Default to generic name if no other match
                if (!fieldValue && (labelText.includes('name') || fieldName.includes('name'))) {
                    fieldValue = `${getRandomFirstName()} ${getRandomLastName()}`;
                }

                if (fieldValue) {
                    field.value = fieldValue;
                    field.dispatchEvent(new Event('input', { bubbles: true }));
                }
            }
        });
    };

    // Ensure the function runs after DOM is fully loaded
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        fillFormFields();
    } else {
        document.addEventListener('DOMContentLoaded', fillFormFields);
    }
})();
