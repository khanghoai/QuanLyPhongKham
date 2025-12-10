package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Login {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int loginID;

    private String timeLogin;
    private String timeLogout;
    private String dateLogin;

    @ManyToOne
    @JoinColumn(name = "accountID")
    private Account account;
        public String getDateLogin() {
        return dateLogin;
    }

    public void setDateLogin(String dateLogin) {
        this.dateLogin = dateLogin;
    }

    public int getLoginID() {
        return loginID;
    }

    public void setLoginID(int loginID) {
        this.loginID = loginID;
    }

    public String getTimeLogin() {
        return timeLogin;
    }

    public void setTimeLogin(String timeLogin) {
        this.timeLogin = timeLogin;
    }

    public String getTimeLogout() {
        return timeLogout;
    }

    public void setTimeLogout(String timeLogout) {
        this.timeLogout = timeLogout;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
