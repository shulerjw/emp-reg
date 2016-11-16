#!/usr/bin/python
# Version 1

import os
import sys
import signal
import re
from os import fsync


def signal_handler(signal, frame):
        print('You pressed Ctrl+C!')
        sys.exit(0)

def printmenu():
    os.system('cls' if os.name == 'nt' else 'clear')
    #os.system('cls') # for Windows
    #os.system('clear')

    print (50 * '-')
    print ("Enter Start/End values?")
    print ("")
    print ("**Note: These values are appended to the standard")
    print ("'SCEmp' username (E.g., 'SCEmp100, SCEmp101, etc).")
    print (50 * '-')
    print ("1. Yes")
    print ("0. No (Quit)")
    print (50 * '-')
    choice = raw_input('Enter your choice [0-1] : ')
    try:
        choice = int(choice)
    except:
        printmenu()
    print (30 * '-')

    if choice == 1:
        configBuilder()
    elif choice == 0:
        cleanExit("bye")
    else:
        printmenu()


def configBuilder():

    startNum = raw_input("Start: ")
    endNum = raw_input("End: ")

    flag = 1
    while flag == 1:
            try:
                int(startNum)
            except ValueError:
                try:
                    float(startNum)
                except ValueError:
                    print (30 * '-')
                    print "Your Number for Accounts to Start at is not a number"
                    print "Your Current Start Number: %s" %(startNum)
                    startNum = raw_input("Number for Accounts to Start at (recommend 0): ")
                    flag = 1
            try:
                int(endNum)
            except ValueError:
                try:
                    float(endNum)
                except ValueError:
                    print (30 * '-')
                    print "Your Number for Accounts to End at is not a number"
                    print "Your Current End Number: %s" %(endNum)
                    startNum = raw_input("Number for Accounts to End at (recommend 10): ")
                    flag = 1
            if startNum > endNum:
                    print (30 * '-')
                    print "Your Number for Accounts to End at must be greater than Number for Accounts to Start at"
                    print "Your Current End Number: %s Your Current Start Number: %s" %(startNum, endNum)
                    startNum = raw_input("Number for Accounts to Start at (recommend 0): ")
                    endNum = raw_input("Number for Accounts to End at (recommend 10): ")
                    flag = 1
            else:
                    flag = 0


    vars = ['startNum', 'endNum']
    new_values = [startNum + ',',endNum + ',',]
    what_to_change = dict(zip(vars,new_values))

    updating('config.js',what_to_change)
    
    raw_input("Accepted.  Press Enter...")
    printmenu()

def updating(filename,dico):

    RE = '(('+'|'.join(dico.keys())+')\s*:)[^\r\n]*?(\r?\n|\r)'
    pat = re.compile(RE)

    def jojo(mat,dic = dico ):
        return dic[mat.group(2)].join(mat.group(1,3))

    with open(filename,'rb') as f:
        content = f.read() 

    with open(filename,'wb') as f:
        f.write(pat.sub(jojo,content))

def cleanExit(message):
    sys.exit(message)


signal.signal(signal.SIGINT, signal_handler)
printmenu()