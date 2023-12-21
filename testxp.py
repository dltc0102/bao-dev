import matplotlib.pyplot as plt
import numpy as np

xp_dict = {
    # 0: 0, 
    1: 50, 
    2: 125, 
    3: 375, 
    4: 675, 
    5: 1175,
    6: 1925, 
    7: 2925, 
    8: 4425, 
    9: 6425, 
    10: 9925, 
    11: 14925, 
    12: 22425, 
    13: 32425, 
    14: 47425, 
    15: 67425, 
    16: 97425, 
    17: 147425, 
    18: 222425, 
    19: 322425, 
    20: 522425, 
    21: 822425, 
    22: 1222425, 
    23: 1722425, 
    24: 2322425, 
    25: 3022425,  
    26: 3822425, 
    27: 4722425, 
    28: 5722425, 
    29: 6822425, 
    30: 8022425, 
    31: 9322425, 
    32: 10722425, 
    33: 12222425, 
    34: 13822425, 
    35: 15522425, 
    36: 17322425, 
    37: 19222425, 
    38: 21222425, 
    39: 23322425, 
    40: 25522425, 
    41: 27822425, 
    42: 30222425, 
    43: 32722425, 
    44: 35322425, 
    45: 38072425, 
    46: 40972425, 
    47: 44072425, 
    48: 47472425, 
    49: 51172425, 
    50: 55172425, 
    51: 59472425, 
    52: 64072425, 
    53: 68972425, 
    54: 74172425, 
    55: 79672425, 
    56: 85472425, 
    57: 91572425, 
    58: 97972425, 
    59: 104672425, 
    60: 111672425, 
}

levels = np.array(list(xp_dict.keys()))
xp_values = np.array(list(xp_dict.values()))

# bao_xp_dict = {}
# bao_levels = levels
# bao_xp_values = xp_values
# goal_xp = 5000000000
# base60_xp = 111672425

# i = 0
# for i in range(int((goal_xp - base60_xp) / 300000) + 60):
#     bao_xp_dict[i+60] = base60_xp + (300000 * i)

# for key, value in bao_xp_dict.items():
#     print(key, value)

plt.figure(figsize=(12, 4))

# graph 1: level vs xp
plt.subplot(1, 3, 1)
plt.plot(levels, xp_values, marker='o', label='data')
fit_coeffs = np.polyfit(levels, xp_values, 1)
fit_line = np.polyval(fit_coeffs, levels)
plt.plot(levels, fit_line, color='red', linestyle='--', label='line of best fit')
plt.title('level vs xp')
plt.xlabel('level')
plt.ylabel('xp')
plt.legend()

# graph 2: log(level) vs log(xp)
log_levels = np.log(levels)
log_xp_values = np.log(xp_values)

plt.subplot(1, 3, 2)
plt.plot(log_levels, log_xp_values, marker='o', label='data')
fit_coeffs = np.polyfit(log_levels, log_xp_values, 1)
fit_line = np.polyval(fit_coeffs, log_levels)
plt.plot(log_levels, fit_line, color='red', linestyle='--', label='line of best fit')
plt.title('log(level) vs log(xp)')
plt.xlabel('log(level)')
plt.ylabel('log(xp)')
plt.legend()

# graph 3: level vs log(xp)
plt.subplot(1, 3, 3)
plt.plot(levels, log_xp_values, marker='o', label='data')
fit_coeffs = np.polyfit(levels, log_xp_values, 1)
fit_line = np.polyval(fit_coeffs, levels)
plt.plot(levels, fit_line, color='red', linestyle='--', label='line of best fit')
plt.title('level vs log(xp)')
plt.xlabel('level')
plt.ylabel('log(xp)')
plt.legend()

plt.tight_layout()
plt.show()


# horyxp = 4000000000
# base60 = 111672425
# print(horyxp - base60)