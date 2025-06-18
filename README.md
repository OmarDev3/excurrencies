# excurrencies Web Application
A simple and user-friendly web application for converting currency exchange rates and performing currency exchanges. This project includes three main pages: a Main Page, Exchange Rate Converter, and Currency Exchange, along with automated tests to ensure functionality.

**Website Link:** https://omardev3.github.io/excurrencies/

## Technologies Used
- HTML, CSS, JavaScript for front-end.
- Selenium WebDriver and pytest for automated testing.
- External currency conversion API for live data.

## Features and Functionality
- Multi-page structure: Includes a main page, exchange rate converter page, and currency exchange page.
- Currency selection: Users can select from a wide list of international currency codes.
- Real-time data: Uses an external API (`https://www.exconvert.com/`) to fetch up-to-date conversion rates.
- Input validation: Checks if required fields are filled and displays error messages accordingly.
- Clear/reset buttons: Allow users to easily reset their selections and inputs.
- Responsive design: Works across different devices and screen sizes.

## Testing
The project includes automated UI tests using Selenium and pytest to ensure reliability and correctness.

### What the Tests Cover:
- Page Titles: Verifies that each page displays the correct title.
- Navigation Buttons: Confirms buttons redirect users to the correct pages.
- Form Validation: Checks that error messages appear when required fields are missing.
- Conversion Accuracy: Validates that conversion rates and results match expected values.
- Clear Functionality: Ensures that reset buttons properly clear the forms and displayed results.

### Benefits of Testing:
- Improves Reliability: Automated tests catch errors early, preventing broken features.
- Enhances User Experience: Ensures that users receive clear feedback and accurate results.
- Simplifies Maintenance: Makes it easier to update code without breaking existing functionality.
- Increases Confidence: Provides assurance that the application behaves as expected across differe.