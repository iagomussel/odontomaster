#!/usr/bin/env python3


"""
InstagramBot.py

this bot can follow, unfollow, like and comment on users

features:
    - follow
    - unfollow
    - like
    - comment
    - follow by hashtag
    - like by hashtag
    - comment by hashtag
    - follow by location
    - like by location
"""
import os
from simple_term_menu import TerminalMenu
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys


import random
import string
#import sleep
from time import sleep
import requests
from threading import Thread
import threading
import multiprocessing

mail_api =  {
    "request": "http://api.temp-mail.org/request/mail/id/md5/",
    "get": "http://api.temp-mail.org/request/mail/id/{}/format/json/",
    "delete": "http://api.temp-mail.org/request/mail/delete/id/{}/",
    "list": "http://api.temp-mail.org/request/mail/list/format/json/",
    }

random_user_api = "https://randomuser.me/api/?nat=br"



class Main:
    def __init__(self):
        self._chromedriver = None
        self._username = None
        self._password = None
        self._email = None
        self._fullName = None
        self._cookies = None
        self._localStorage = None
        self.get_chromedriver()
        self.initMenu()


    def initMenu(self):
        """
        this function print a menu and call
        the function that correspond to
        the option selected
        @param self: the object pointer
        @return: None
        """
        PrimaryMenu = TerminalMenu(
            ["Make Login", "Create Account", "exit"], title="Instagram Bot:")

        selected = PrimaryMenu.show()
        if selected == 0:
            self.Login()
        elif selected == 1:
            self.CreateInstagramAccount()

        elif selected == 2:
            sys.exit()

    def get_chromedriver(self):
        """
        this function return a chromedriver object
        @param self: the object pointer
        @return: chromedriver object
        """
        self.checkChromeDriver()
        if not self._chromedriver:
            self._chromedriver = webdriver.Chrome("/usr/bin/chromedriver")
        return self._chromedriver

    def Login(self):
        """
        this function do login into instagram
        @param self: the object pointer
        @return: None
        """
        sys.stdout.write("\033[2J\033[H")
        self._username = input("Enter your username: ")
        self._password = input("Enter your password: ")
        chromedriver = self.get_chromedriver()
        try:
            chromedriver.get("https://www.instagram.com/accounts/login/")
            chromedriver.find_element_by_name("username").send_keys(username)
            chromedriver.find_element_by_name("password").send_keys(password)
            chromedriver.find_element_by_xpath("//button[@type='submit']").click()
        except:
            print("Error logging in")
            Login()
        if chromedriver.current_url == "https://www.instagram.com/accounts/login/":
            print("Error logging in")
            Login()
        else:
            self._cookies = chromedriver.get_cookies()
            #get localstorage using javascript executor
            self._localStorage = chromedriver.execute_script(
                "return window.localStorage;")
            return None


    def checkChromeDriver(self):
        """
        this function check if chromedriver is installed
        Download and install if not installed
        @param self: the object pointer
        @return: None
        """
        if not os.path.exists("/usr/bin/chromedriver"):
            # install chromedriver
            print("chromedriver not found")
            print("installing chromedriver")
            os.system("sudo apt-get install chromium-chromedriver")
            print("chromedriver installed")


    def CreateInstagramAccount(self):
        """
        this function create an instagram account
        @param self: the object pointer
        @return: None
        """
        sys.stdout.write("\033[2J\033[H")
        print("Creating random Instagram Account")
        person = requests.get(random_user_api).json()
        # print person data
        print("Name: {} {}".format(person["results"][0]["name"]["first"],
                                   person["results"][0]["name"]["last"]))
        print("Phone: {}".format(person["results"][0]["phone"]))
        print("Email: {}".format(person["results"][0]["email"]))
        print("Gender: {}".format(person["results"][0]["Gender"]))


        username = person["results"][0]["login"]["username"] + "".join(
        random.choice(string.ascii_lowercase) for i in range(3))
        password = "".join(random.choice(string.ascii_lowercase) for i in range(8))
        email = "him_mussel@live.com"
        fullName = person["results"][0]["name"]["first"] + " " + person["results"][0]["name"]["last"]
        chromedriver = self.get_chromedriver()

        try:

            # go to instagram
            chromedriver.get("https://www.instagram.com/accounts/emailsignup/")
            #wait for the page to load
            WebDriverWait(chromedriver, 10).until(
                EC.presence_of_element_located((By.NAME, "emailOrPhone")))
            # enter email
            chromedriver.find_element_by_name("emailOrPhone").send_keys(email)
            # enter username
            chromedriver.find_element_by_name("username").send_keys(username)
            # enter password
            chromedriver.find_element_by_name("password").send_keys(password)
            # enter full name
            chromedriver.find_element_by_name("fullName").send_keys(fullName)
            # click on create account
            chromedriver.find_element_by_xpath("//button[@type='submit']").click()
        except Exception as e:
            print("Error creating account")
            print(e)
        if chromedriver.current_url == "https://www.instagram.com/accounts/emailsignup/":
            print("Error creating account")
            print("Try again")

        else:
            self._cookies = chromedriver.get_cookies()
            #get localstorage using javascript executor
            self._localStorage = chromedriver.execute_script(
                "return window.localStorage;")
            return None




def geradorCpf():
    cpf = ''.join(random.choice(string.digits) for i in range(9))

    numbers = [int(digit) for digit in cpf if digit.isdigit()]
    #calcula o primeiro digito
    sum_of_products = sum(a*b for a, b in zip(numbers[0:9], range(10, 1, -1)))
    expected_digit = (sum_of_products * 10 % 11) % 10
    cpf += str(expected_digit)

    #add expected digit to array numbers
    numbers.append(expected_digit)

    # calcula o segundo digito
    sum_of_products = sum(a*b for a, b in zip(numbers[0:10], range(11, 1, -1)))
    expected_digit = (sum_of_products * 10 % 11) % 10
    cpf += str(expected_digit)

    return cpf

def consultarCPF():
    cpf = geradorCpf()
    url="https://api-auth.serasa.com.br/v1/user/cpf"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0',
        'TE': 'Trailers'
    }


    data = '{"cpf":"'+cpf+'"}'
    response = requests.post(url, headers=headers, data=data)
    if response.status_code == 200:
        print ("CPF existe "+ cpf)
        return cpf
    elif response.status_code == 404:
        return False
    else:
        print ("Resposta diferente do esperado")
        print (response.status_code)
        
        return None

if __name__ == '__main__':
    threads = []

    # get the number of cores in the system
    number_of_cores = multiprocessing.cpu_count()

    ThreadNumber = 10*number_of_cores
    print("Creating {} threads".format(ThreadNumber))
    print("Number of cores: {}".format(number_of_cores))
    print("Making requests...")
    while True:
        for i in range(ThreadNumber):
            t = Thread(target=consultarCPF)
            threads.append(t)
            t.start()
        for t in threads:
            t.join()
            #when thread ends start another
        if len(threads) < ThreadNumber:
            t = Thread(target=consultarCPF)
            threads.append(t)
            t.start()


