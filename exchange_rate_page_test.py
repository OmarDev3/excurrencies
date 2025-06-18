"""
The test file verifies the functionality of the exchange rate converter page.
It checks that the page title is correctly displayed, ensure that the navigation buttons redirect to their respective target pages, and verifies the fields of page.
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get("https://omardev3.github.io/excurrencies/rate%20converter.html")
    yield driver
    driver.quit()

def test_title_page(driver):
   assert driver.title == "Rate Converter"

def test_main_btn(driver):
    driver.find_element(By.ID, "main").click()

    main_page_title = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "page-title")))
    assert main_page_title.text == "Main Page"

def test_currency_exchange_btn(driver):
   driver.find_element(By.ID, "exchange").click()

   currency_exchange_title = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "page-title")))
   assert currency_exchange_title.text == "Currency Exchange"

#verify all error message fields
def test_error_message_fields(driver):
    driver.find_element(By.ID, "convert-button1").click()

    base_error_msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "missing-base-currency1")))
    target_error_msg = WebDriverWait(driver, 10).until(EC.visibility_of_element_located(((By.CLASS_NAME, "missing-target-currency1"))))
    assert base_error_msg.text == "Enter base currency"
    assert target_error_msg.text == "Enter target currency"

#verify valid conversion rate
def test_conversion_rate(driver):
    Select(driver.find_element(By.ID, "base-currency1")).select_by_visible_text("BHD")
    Select(driver.find_element(By.ID, "target-currency1")).select_by_visible_text("SAR")
    driver.find_element(By.ID, "convert-button1").click()

    conversion_rate = (By.CLASS_NAME, "display-rate")

    WebDriverWait(driver, 10).until(EC.text_to_be_present_in_element(conversion_rate, "Conversion Rate: 9.95"))
    assert driver.find_element(*conversion_rate).text == "Conversion Rate: 9.95"

#verify clear button reset the fields page
def test_clear_btn(driver):
    base_dropdown_list = Select(driver.find_element(By.ID, "base-currency1"))
    base_dropdown_list.select_by_visible_text("BHD")

    target_dropdown_list = Select(driver.find_element(By.ID, "target-currency1"))
    target_dropdown_list.select_by_visible_text("SAR")

    driver.find_element(By.ID, "convert-button1").click()
    driver.find_element(By.XPATH, "/html/body/div/div[3]/form/button[2]").click()

    display_rate = driver.find_element(By.CLASS_NAME, "display-rate")

    assert base_dropdown_list.first_selected_option.get_attribute("value") == ""
    assert target_dropdown_list.first_selected_option.get_attribute("value") == ""
    assert display_rate.text == ""