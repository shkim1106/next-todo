import matplotlib.pyplot as plt

# Given data points
x_values = [-3, -2, 0, 1]
y_values = [9, 6, 2, 1]

# Calculated linear function
def linear_func(x):
    return 8 * x - 3.5

# Plotting the points
plt.scatter(x_values, y_values, color='red', label='Data Points')

# Plotting the linear function
x_range = [-4, 2]
plt.plot(x_range, [linear_func(x) for x in x_range], color='blue', label='Linear Function: y = 8x - 3.5')

plt.xlabel('x')
plt.ylabel('y')
plt.title('Best Fit Linear Function')
plt.legend()
plt.grid(True)
plt.axhline(0, color='black',linewidth=0.5)
plt.axvline(0, color='black',linewidth=0.5)
plt.show()
