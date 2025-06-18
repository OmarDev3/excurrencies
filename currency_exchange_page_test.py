"""
The test file verifies the functionality of the currency exchange page.
It checks that the page title is correctly displayed, ensure that the navigation buttons redirect to their respective target pages, and verifies the fields of page.
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get("https://omardev3.github.io/excurrencies/currency%20exchange.html")
    yield driver
    driver.quit()

def test_title_page(driver):
    assert driver.title == "Currency Exchange"

def test_main_page(driver):
    driver.find_element(By.ID, "main").click()

    main_page_title = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "page-title")))
    assert main_page_title.text == "Main Page"

def test_exchange_rate_page(driver):
    driver.find_element(By.ID, "rate").click()

    rate_page_title = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "page-title")))
    assert rate_page_title.text == "Exchange Rate Converter"

#verify all error message fields
def test_error_message_fields(driver):
    driver.find_element(By.ID, "convert-button2").click()

    base_error_message = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "missing-base-currency2")))
    target_error_message = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "missing-target-currency2")))
    amount_error_message = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "missing-amount")))

    assert base_error_message.text == "Enter base currency"
    assert target_error_message.text == "Enter target currency"
    assert amount_error_message.text == "Enter amount"

#verify valid conversion result
def test_conversion_result(driver):
    Select(driver.find_element(By.ID, "base-currency2")).select_by_visible_text("BHD")
    Select(driver.find_element(By.ID, "target-currency2")).select_by_visible_text("SAR")
    driver.find_element(By.ID, "amount").send_keys("100")
    driver.find_element(By.ID, "convert-button2").click()

    conversion_result = (By.CLASS_NAME, "display-result")

    WebDriverWait(driver, 10).until(EC.text_to_be_present_in_element(conversion_result, "Conversion Result: 995.28"))
    assert driver.find_element(*conversion_result).text == "Conversion Result: 995.28"

#verify clear button reset the fields page
def test_clear_btn(driver):
    base_dropdown_list = Select(driver.find_element(By.ID, "base-currency2"))
    base_dropdown_list.select_by_visible_text("BHD")

    target_dropdown_list = Select(driver.find_element(By.ID, "target-currency2"))
    target_dropdown_list.select_by_visible_text("SAR")

    amount_input = driver.find_element(By.ID, "amount")
    amount_input.send_keys("100")

    driver.find_element(By.ID, "convert-button2").click()
    driver.find_element(By.XPATH, "/html/body/div/div[3]/form/button[2]").click()

    display_rate = driver.find_element(By.CLASS_NAME, "display-result")

    assert base_dropdown_list.first_selected_option.get_attribute("value") == ""
    assert target_dropdown_list.first_selected_option.get_attribute("value") == ""
    assert amount_input.text == ""
    assert display_rate.text == ""