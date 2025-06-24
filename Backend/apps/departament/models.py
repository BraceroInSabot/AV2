from django.db import models

class Address(models.Model):
    address_ID = models.AutoField(primary_key=True, db_column='address_ID')
    address_street = models.CharField(max_length=255, db_column='address_street', blank=True, null=True)
    address_neighborhood = models.CharField(max_length=100, db_column='address_neighborhood', blank=True, null=True)
    address_number = models.CharField(max_length=8, db_column='address_number', blank=True, null=True)
    address_city = models.CharField(max_length=100, db_column='address_city', blank=True, null=True)
    address_zip_code = models.CharField(max_length=20, db_column='address_zip_code', blank=True, null=True)
    address_country = models.CharField(max_length=100, db_column='address_country', blank=True, null=True)

    class Meta:
        db_table = 'Address'
        verbose_name = "Address"
        verbose_name_plural = 'Addresses'

class Departament(models.Model):
    department_ID = models.AutoField(primary_key=True, db_column='department_ID')
    department_name = models.CharField(max_length=100, db_column='department_name')
    department_description = models.TextField(db_column='department_description', blank=True, null=True)
    department_phone = models.CharField(max_length=15, db_column='department_phone', blank=True, null=True)
    department_created_at = models.DateTimeField(auto_now_add=True, db_column='department_created_at')
    department_manager = models.CharField(max_length=100, db_column='department_manager', blank=True, null=True)
    department_address = models.ForeignKey(Address, on_delete=models.CASCADE, db_column='department_address', blank=True, null=True)

    class Meta:
        db_table = 'Departament'
        verbose_name = 'Departamento'
        verbose_name_plural = 'Departamentos'
        ordering = ['department_name']

class Function(models.Model):
    function_ID = models.AutoField(primary_key=True, db_column='function_ID')
    function_title = models.CharField(max_length=100, db_column='function_title')
    function_salary = models.DecimalField(max_digits=10, decimal_places=2, db_column='function_salary', blank=True, null=True)
    function_manager = models.CharField(max_length=100, db_column='function_manager', blank=True, null=True)
    function_employee = models.ForeignKey('Employee', on_delete=models.CASCADE, db_column='function_employee', blank=True, null=True)

    class Meta:
        db_table = 'Function'
        verbose_name = 'Função'
        verbose_name_plural = 'Funções'

class Employee(models.Model):
    employee_ID = models.AutoField(primary_key=True, db_column='employee_ID')
    employee_name = models.CharField(max_length=100, db_column='employee_name')
    employee_email = models.EmailField(max_length=255, db_column='employee_email', blank=True, null=True)
    employee_phone = models.CharField(max_length=15, db_column='employee_phone', blank=True, null=True)
    employee_birth_date = models.DateField(db_column='employee_birth_date', blank=True, null=True)
    employee_hire_date = models.DateTimeField(auto_now_add=True, db_column='employee_hire_date')
    employee_department = models.ForeignKey(Departament, on_delete=models.CASCADE, db_column='employee_department', blank=False, null=False)
    employee_address = models.ForeignKey(Address, on_delete=models.CASCADE, db_column='employee_address', blank=True, null=True)
    employee_function = models.ForeignKey(Function, on_delete=models.CASCADE, db_column='employee_function', blank=True, null=True)

    class Meta:
        db_table = 'Employee'
        verbose_name = 'Funcionário'
        verbose_name_plural = 'Funcionários'
        ordering = ['employee_name']        