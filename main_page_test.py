"""
The test file verifies the functionality of the main page.
It checks that the page title is correctly displayed and ensure that the navigation buttons redirect to their respective target pages.
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get("https://omardev3.github.io/excurrencies")
    yield driver
    driver.quit()

def test_title_page(driver):
    assert driver.title == "Main"

def test_exchange_rate_btn(driver):
    driver.find_element(By.ID, "rate").click()

    rate_page_title = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "page-title")))
    assert rate_page_title.text == "Exchange Rate Converter"

def test_currency_exchange_btn(driver):
    driver.find_element(By.ID, "exchange").click()

    exchange_page_title = WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.CLASS_NAME, "page-title")))
    assert exchange_page_title.text == "Currency Exchange"